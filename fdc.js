const axios = require('axios');
const readline = require('readline');
const https = require('https');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const agent = new https.Agent({  
  rejectUnauthorized: false  
});

async function createUser(referralCode) {
  for (let i = 0; i < 25; i++) {
    try {
      const responseRandomUser = await axios.get("https://randomuser.me/api/");
      const randomUserData = responseRandomUser.data;
      const randomName = `${randomUserData.results[0].name.first} ${randomUserData.results[0].name.last}`;

      const data1 = {
        username: `${randomUserData.results[0].name.first}${Math.floor(Math.random() * 9000) + 1000}@mailnesia.com`,
        hp: `08${Math.floor(Math.random() * 8000000000 + 1000000000)}`
      };

      const response1 = await axios.post("https://209.97.175.79/api/accountTemps/add", data1, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      const userId = response1.data?.item?.id;
      if (!userId) {
        console.log("Error: Could not create user.");
        continue;
      }

      const data2 = {
        id: userId,
        name: randomName,
        email: `${randomUserData.results[0].name.first}${Math.floor(Math.random() * 9000) + 1000}@mailnesia.com`,
        birthDate: "1990-01-01",
        gender: "1",
        "address[street]": "Street Name",
        "address[city]": "City Name",
        "address[district]": "District Name",
        "address[postCode]": "00000"
      };

      const response2 = await axios.put(`https://209.97.175.79/api/accountTemps/${userId}/edit`, new URLSearchParams(data2).toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      if (response2.data?.status !== "success") {
        console.log("Error: Could not edit user.");
        continue;
      }

      const data3 = {
        id: userId,
        password: "PentilPink2024",
        referralCode: referralCode
      };

      const response3 = await axios.post("https://209.97.175.79/api/accountTemps/register", new URLSearchParams(data3).toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        httpsAgent: agent
      });

      if (response3.data?.status === "success") {
        console.log("Registration Successfully");
      } else {
        console.log("Error: Registration failed.");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

console.log("-=[ PENTIL.PINK ] =-");
console.log("Group: https://t.me/pentilreborn");
console.log("Channel: https://t.me/pentilpinkv2");
rl.question("Please enter the referral code: ", referralCode => {
  createUser(referralCode).then(() => {
    rl.close();
  });
});
