import * as Keychain from 'react-native-keychain';

export async function saveTokens(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  await Keychain.setGenericPassword(
    tokens.accessToken,
    tokens.refreshToken,
    {service: "tokens"},
  );
}

export async function getTokens() {
  const credentials = await Keychain.getGenericPassword({service: 'tokens'});
  if (!credentials) {
    return null;
  }
  return {accessToken: credentials.username, refreshToken: credentials.password};
}

export async function removeTokens() {
  try {
    await Keychain.resetGenericPassword({service: 'tokens'});
  } catch (error) {
    console.log(error);
    
  }
  
}
