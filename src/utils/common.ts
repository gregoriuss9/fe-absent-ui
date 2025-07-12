export const generatePassword = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const mapDay = (day: string): string => {
  switch (day.toLowerCase()) {
    case "monday":
      return "Senin";
    case "tuesday":
      return "Selasa";
    case "wednesday":
      return "Rabu";
    case "thursday":
      return "Kamis";
    case "friday":
      return "Jumat";
    case "saturday":
      return "Sabtu";
    case "sunday":
      return "Minggu";
  }
  return "-";
};

export const mapMonth = (month: string): string => {
  switch (month.toLowerCase()) {
    case "january":
      return "Januari";
    case "february":
      return "Februari";
    case "march":
      return "Maret";
    case "april":
      return "April";
    case "may":
      return "Mei";
    case "june":
      return "Juni";
    case "july":
      return "Juli";
    case "august":
      return "Agustus";
    case "september":
      return "September";
    case "october":
      return "Oktober";
    case "november":
      return "November";
    case "december":
      return "Desember";
  }
  return "-";
};
