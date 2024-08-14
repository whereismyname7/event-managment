const express = require('express');
const app = express();
const port = 3000;

app.get('/event-categories', (req, res) => {
  const data = [
    {
      "nameAr": "ترفيهية",
      "nameEn": "entertainment",
      "value": 5000
    },
    {
      "nameAr": "تعليمية",
      "nameEn": "educational",
      "value": 4500
    },
    {
      "nameAr": "مهنية",
      "nameEn": "professional",
      "value": 3000
    },
    {
      "nameAr": "أخرى",
      "nameEn": "others",
      "value": 4000
    },
  ]
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.send(data);
});

app.get('/event-types', (req, res) => {
  const data = [
    {
      "nameAr": "حضورية",
      "nameEn": "on-site",
      "value": Math.floor(Math.random() * 50001),
      "extra": {
        "code": "ons"
      }
    },
    {
      "nameAr": "عن بعد",
      "nameEn": "online",
      "value": Math.floor(Math.random() * 50001),
      "extra": {
        "code": "onl"
      }
    },
  ]
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.send(data);
});

app.get('/event-attendance', (req, res) => {
  const data = [
    {
      "name": "1",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "2",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "3",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "4",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "5",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "6",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "7",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "8",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "9",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "10",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "11",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "12",
      "series": [
        {
          "nameAr": "ذكر",
          "nameEn": "male",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "nameAr": "أنثى",
          "nameEn": "female",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    }
  ]
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.send(data);
});

 
app.get('/total-events', (req, res) => {
  const data = [
    {
      "name": "1",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "2",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "3",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "4",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "5",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "6",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "7",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "8",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "9",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "10",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "11",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    },
    {
      "name": "12",
      "series": [
        {
          "name": "عن بعد",
          "nameEn": "online",
          "value": Math.floor(Math.random() * 15001)
        },
        {
          "name": "حضورية",
          "nameEn": "on-site",
          "value": Math.floor(Math.random() * 15001)
        }
      ]
    }
  ]
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.send(data);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
