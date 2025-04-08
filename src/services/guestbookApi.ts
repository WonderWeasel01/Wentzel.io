import { Signature } from '../pages/guest-book';

const LOCAL_STORAGE_KEY = 'guestbookSignatures';

export const saveSignature = async (signature: Signature) => {
  // Hent eksisterende signaturer fra localStorage
  const existingSignatures = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
  );

  // Tilføj den nye signatur
  existingSignatures.push(signature);

  // Gem signaturerne i localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingSignatures));

  return { data: signature }; // Returner signaturen som respons
};

export const getSignatures = async () => {
  // Hent signaturer fra localStorage
  const signatures = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
  );
  return { data: signatures };
};
