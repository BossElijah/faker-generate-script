import faker from "faker";
import fs from 'fs';

const segments = {
  "Segment A": "SEGA",
  "Segment B": "SEGB",
  "Segment C": "SEGC",
  "Segment D": "SEGD",
};

const employees = {};
for (let i = 1; i <= 10; i += 1) {
  const randomNumber = faker.datatype.number({ min: 10000, max: 99999 });
  employees[`x${randomNumber}`] = faker.name.findName();
}

const generateArray = (valueCallback, count) => {
  const array = [];
  for (let i = 1; i <= count; i += 1) {
    array.push(valueCallback());
  }
  return array;
};


const data = [];
for (let i = 0; i < 200000; i++) {
  const row = {
    kisMother: faker.company.companyName(),
    cvr: faker.unique(() =>
      faker.datatype.number({ min: 1000000000, max: 9999999999 })
    ),
    segment: faker.random.arrayElement(Object.keys(segments)),
    kisMotherId: faker.datatype.uuid(),
    onHoldStatus: faker.random.arrayElement(["Ingen", "Alle", "Delvis"]),
    sumNotDue: faker.datatype.number({
      min: 1000,
      max: 10000,
      precision: 0.1,
    }),
    sum10Days: faker.random.arrayElement([
      faker.datatype.number({ min: -10000, max: 100000, precision: 0.1 }),
      0,
    ]),
    sum1stMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum2ndMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum3rdMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum4thMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum5thMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum6thMonth: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    sum7thMonthUp: faker.datatype.number({
      min: 10000,
      max: 200000,
      precision: 0.1,
    }),
    sumOfAll: faker.datatype.number({
      min: 50000,
      max: 300000,
      precision: 0.1,
    }),
    sumDue: faker.datatype.number({
      min: 10000,
      max: 100000,
      precision: 0.1,
    }),
    assignedEmployee: faker.random.arrayElement(Object.keys(employees)),
    hasData: faker.datatype.boolean(),
    customerId: faker.unique(() =>
      faker.datatype.number({ min: 1, max: 10000000 })
    ),
    change: generateArray(() => faker.datatype.number({ min: -1, max: 1, precision: 0.01 }), 15)
  };
  row.segmentCode = segments[row.segment];
  data.push(row);
}

console.log("data.length", data.length);

fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, data) => {
  if (err) {
    console.err('Error: ', err);
  } else {
    console.log('Data successfully stored in `data.json`');
  }
})
