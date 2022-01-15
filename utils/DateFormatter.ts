type dataFormatter = (date: number) => string;
interface suffixesType {
  [key: string]: string;
}

const suffixSelector = (lastLetter: string) => {
  let suffix = "";
  switch (lastLetter) {
    case "1":
      suffix = "one";
      break;
    case "2":
      suffix = "two";
      break;
    case "3":
      suffix = "three";
      break;
    default:
      suffix = "rest";
  }

  return suffix;
};

const dateFormatter: dataFormatter = (date: number) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  const suffixes: suffixesType = {
    one: "st",
    two: "nd",
    three: "rd",
    rest: "th",
  };

  const splitDate = formattedDate.split(" ");

  for (let i = 0; i < splitDate.length - 1; i++) {
    if (i === 0) {
      splitDate[i] = splitDate[i] + ",";
    } else if (i === 1) {
      const splitDay = splitDate[i].split(",");

      const lastLetter = splitDay[0].slice(-1);
      splitDay[i] += `${suffixes[suffixSelector(lastLetter)]},`;
      splitDate[i] = splitDay.join("");
    }
  }
  return splitDate.join(" ");
};

export default dateFormatter;
