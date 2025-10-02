interface PassengerData {
  gender: string;
  age: number;
  ticketClass: number;
  parents: number;
  children: number;
  siblings: number;
  spouse : number;
}

export function calculateSurvival(data: PassengerData): { survived: boolean; probability: number } {
  let probability = 50;

  if (data.gender === 'female') {
    probability += 30;
  } else {
    probability -= 20;
  }

  if (data.ticketClass === 1) {
    probability += 20;
  } else if (data.ticketClass === 2) {
    probability += 5;
  } else {
    probability -= 15;
  }

  if (data.age < 16) {
    probability += 15;
  } else if (data.age > 60) {
    probability -= 10;
  }

  const familySize = data.parents + data.children + data.siblings;
  if (familySize > 0 && familySize <= 3) {
    probability += 10;
  } else if (familySize > 3) {
    probability -= 5;
  }

  probability = Math.max(5, Math.min(95, probability));

  const survived = probability > 50;

  return {
    survived,
    probability: Math.round(probability),
  };
}
