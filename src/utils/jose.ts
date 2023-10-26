import * as jose from "jose";

const JWKS = jose.createRemoteJWKSet(
  new URL(
    process.env.NEXT_PUBLIC_JWKS_ENDPOINT ||
      "https://desired-mantis-48.clerk.accounts.dev/.well-known/jwks.json"
  )
);
const issuer =
  process.env.NEXT_PUBLIC_ISSUER ||
  "https://desired-mantis-48.clerk.accounts.dev";

export const decodeToken = async (token: string) => {
  const { payload, protectedHeader } = await jose.jwtVerify(token, JWKS, {
    issuer: issuer,
  });
  return { payload, protectedHeader };
};
