export const getAbbreviatedAddress = (address: string) => {
    const len = address.length;
    const first3 = address.substring(0, 5);
    const last3 = address.substring(len - 5, len);
    return first3 + "..." + last3;
  };