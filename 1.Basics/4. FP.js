/**
 * Parses the CSV text and returns a function to replace city names in a given text
 * @param {string} textCSV - The CSV text to parse
 * @returns {function} - A function to replace city names in a given text
 */
function parserCSV(textCSV) {
    // Split the text into lines, remove comment lines, and map the lines to objects
    textCSV = textCSV
        .split("\n")
        .filter(textCSV => /^(?!#).+$/gim.test(textCSV))
        .map(textCSV => {
            textCSV = textCSV.replace("#", "").split(",");

            return { 'x': textCSV[0], 'y': textCSV[1], 'name': textCSV[2], 'population': textCSV[3] }
        })
        .sort((a, b) => b.population - a.population) // Sort the objects by population in descending order
        .slice(0, 9) // Get the top 10 objects
        .reduce(function (allCities, current) {
            allCities[current.name] = { 'population': current.population, 'rating': Object.keys(allCities).length + 1 }

            return allCities
        }, {}); // Convert the objects into a single object with city names as keys and population and rating as values

    /**
     * Replaces city names in the given text with modified text
     * @param {string} text - The text to replace city names in
     * @returns {string} - The modified text with replaced city names
     */
    return function replaceInText(text) {
        for (city in textCSV) {
            if (text.includes(city)) {
                // Replace city names with modified text
                text = text.replace(
                    `${city}`,
                    `${city} (${textCSV[city].rating} місце в ТОП-10 найбільших міст України, населення ${textCSV[city].population} чоловік)`
                );
            }
        }
        return text;
    };
}

let test111CSV = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

178.34343,10.2,Дніпро,978356
1.3214,25.111,Київ,3065455
123.324,22.3,Донецьк,756345
13.224,32.45,Львів,1234567
24.76,12.78,Кривий Ріг,456234
22.144,22.1456,Івано-Франківськ,345678


# в этом файле три строки-коммента :)`

let test = parserCSV(test111CSV);
test("Дніпро та Київ");
console.log(test("Дніпро та Київ"));
