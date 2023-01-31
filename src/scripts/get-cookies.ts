import { getSignedCookies } from "@aws-sdk/cloudfront-signer";

const KEYPAIR_ID = import.meta.env.CF_KEYPAIR_ID;
const CF_DOMAIN = import.meta.env.CF_DOMAIN;

/**
const privateKey = `
-----BEGIN PRIVATE KEY-----
you need to load your privateKey here
-----END PRIVATE KEY-----
`;
**/

// decode the base64 string from ENV
const privateKey = atob(import.meta.env.CF_PRIVATE_KEY);

export const generateCookie = () => {
  const date = new Date();
  // keep the validation for 5 minutes
  date.setMinutes(date.getMinutes() + 5);

  const policy = {
    Statement: [
      {
        // incase you are using signedURL put full path of your object here
        Resource: `${CF_DOMAIN}/images/*`,
        Condition: {
          DateLessThan: {
            // Remove the milliseconds
            "AWS:EpochTime": Math.round(date.getTime() / 1000),
          },
        },
      },
    ],
  };

  const cookie = getSignedCookies({
    url: CF_DOMAIN,
    keyPairId: KEYPAIR_ID,
    privateKey: privateKey,
    policy: JSON.stringify(policy),
  });

  return cookie;
};
