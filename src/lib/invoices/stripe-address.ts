type StripeBillingAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

export function formatStripeBillingAddress(address: StripeBillingAddress | null | undefined) {
  if (!address) return null;

  const cityLine = [address.city, address.state, address.postal_code]
    .filter((part) => part?.trim())
    .join(", ");

  const lines = [
    address.line1?.trim(),
    address.line2?.trim(),
    cityLine || null,
    address.country?.trim(),
  ].filter(Boolean);

  return lines.length > 0 ? lines.join("\n") : null;
}
