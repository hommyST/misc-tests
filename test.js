let a = [
  {
    "trigger_id": 79,
    "email": 1
  },
  {
    "trigger_id": 59,
    "telegram": 1
  },
  {
    "trigger_id": 59,
    "email": 1
  },
  {
    "trigger_id": 27,
    "telegram": 1
  },
  {
    "trigger_id": 27,
    "email": 1
  },
  {
    "trigger_id": 29,
    "telegram": 1
  },
  {
    "trigger_id": 29,
    "email": 1
  },
  {
    "trigger_id": 35,
    "telegram": 1
  },
  {
    "trigger_id": 35,
    "email": 1
  },
  {
    "trigger_id": 25,
    "telegram": 1
  },
  {
    "trigger_id": 25,
    "email": 1
  }
]

let res = [];
a.forEach(trigger => {
  a.forEach(el => {
    if (trigger.trigger_id === el.trigger_id) {
      let tmp = {
        trigger_id: trigger.trigger_id,
        email: 1,
        telegram: 1
      }

      res.push(tmp);
    }
  })
})

console.log(res);