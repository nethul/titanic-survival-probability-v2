interface PassengerData {
  gender: string;
  age: number;
  ticketClass: number;
  parents: number;
  children: number;
  siblings: number;
  spouse: number;
}

export async function calculateSurvival(data: PassengerData): Promise<{ survived: boolean; probability: number }> {
  try {
    // Calculate total family size (sibsp and parch for the model)
    const sibsp = data.siblings + data.spouse;
    const parch = data.parents + data.children;

    // Call your Heroku API
    const response = await fetch('https://luhten-titanic-api-e1ecd546fe59.herokuapp.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pclass: data.ticketClass,
        sex: data.gender,
        age: data.age,
        sibsp: sibsp,
        parch: parch,
      }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }else{
      console.log('API request succeeded');
    }

    const result = await response.json();
    
    return {
      survived: result.survival_status === 'Survive',
      probability: Math.round(result.survival_probability),
    };
  } catch (error) {
    console.error('Error calling prediction API:', error);
    // Fallback to rule-based calculation if API fails
    return fallbackCalculation(data);
  }
}

// Fallback function (your original rule-based logic)
function fallbackCalculation(data: PassengerData): { survived: boolean; probability: number } {
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

  const familySize = data.parents + data.children + data.siblings + data.spouse;
  if (familySize > 0 && familySize <= 3) {
    probability += 10;
  } else if (familySize > 3) {
    probability -= 5;
  }

  probability = Math.max(5, Math.min(95, probability));

  return {
    survived: probability > 50,
    probability: Math.round(probability),
  };
}