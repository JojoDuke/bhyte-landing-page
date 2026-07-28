import fs from "node:fs";
import nodemailer from "nodemailer";

function loadEnvLocal() {
  const env = { ...process.env };
  if (!fs.existsSync(".env.local")) return env;

  for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  return env;
}

async function test(label, env, port, secure) {
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST ?? "mail.privateemail.com",
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user: env.SMTP_USER ?? env.INVOICE_EMAIL_FROM ?? "jojoduke@bhytesoftware.com",
      pass: env.PRIVATE_EMAIL_PASSWORD ?? env.SMTP_PASSWORD,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    tls: { minVersion: "TLSv1.2" },
  });

  try {
    await transport.verify();
    console.log(`${label}: OK`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`${label}: FAIL - ${message}`);
    return false;
  } finally {
    transport.close();
  }
}

const env = loadEnvLocal();
const user = env.SMTP_USER ?? env.INVOICE_EMAIL_FROM ?? "jojoduke@bhytesoftware.com";
console.log("SMTP user:", user);
console.log("Password configured:", Boolean(env.PRIVATE_EMAIL_PASSWORD ?? env.SMTP_PASSWORD));

const ok587 = await test("587 STARTTLS", env, 587, false);
const ok465 = await test("465 SSL", env, 465, true);

if (!ok587 && !ok465) {
  process.exitCode = 1;
}
