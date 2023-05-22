const personGenerator = {
    surnameJson: `{  
        "count": 15,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Евгения",
            "id_2": "Марта",
            "id_3": "Ирина",
            "id_4": "Аполинария",
            "id_5": "Дина",
            "id_6": "Ольга",
            "id_7": "Мария",
            "id_8": "Дарья",
            "id_9": "Оксана",
            "id_10": "Анна"
        }
    }`,
    professionMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "плотник",
            "id_2": "столяр",
            "id_3": "дальнобойщик",
            "id_4": "санитар",
            "id_5": "шахтер",
            "id_6": "дворник",
            "id_7": "стюарт",
            "id_8": "певец",
            "id_9": "автомеханик",
            "id_10": "кровельщик"
        }
    }`,
    
    professionFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "балерина",
            "id_2": "манекенщица",
            "id_3": "медсестра",
            "id_4": "певица",
            "id_5": "учительница",
            "id_6": "швея",
            "id_7": "стюардесса",
            "id_8": "массажистка",
            "id_9": "доярка",
            "id_10": "няня"
        }
    }`,

    monthBirthJson: `{
        "count": 12,
        "list": {     
            "id_1": " января ",
            "id_2": " февраля ",
            "id_3": " марта ",
            "id_4": " апреля ",
            "id_5": " мая ",
            "id_6": " июня ",
            "id_7": " июля ",
            "id_8": " августа ",
            "id_9": " сентября ",
            "id_10": " октября ",
            "id_11": " ноября ",
            "id_12": " декабря "
        }
    }`,


    GENDER_MALE: 'мужчина',
    GENDER_FEMALE: 'женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),
 
    
    //randomValue выбирает строку из списка - элемента объекта, 
    // который мы получаем в результате десериализации из json
    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    // randomGender случайным образом выбирет пол  персоны
    randomGender: function() {
        return (this.randomIntNumber() ? this.GENDER_MALE : this.GENDER_FEMALE);
   },
    
      
     randomFirstName: function() {
            if (this.person.gender === 'мужчина') {
               return this.randomValue(this.firstNameMaleJson);
            } else {
                return this.randomValue(this.firstNameFemaleJson);
            }
        },

    // то же самое, что и про имя
     randomSurname: function() {
         if (this.person.gender === 'мужчина') {
            return this.randomValue(this.surnameJson);
           } else {
             return this.randomValue(this.surnameJson) + "а";
            }
    },
      
    // генерирует отчество из списка мужских имен. Для фиксации введена переменная x.
    randomPatronomic: function() {
        let x = this.randomValue(this.firstNameMaleJson);
        if (x.endsWith('а') && this.person.gender === 'мужчина') {
            return x.slice(0, -1) + 'ич';

        } if (x.endsWith('а') && this.person.gender === 'женщина') {
            return x.slice(0, -1) + 'ична';

        } if (x.endsWith('й') && this.person.gender === 'мужчина') {
            return x.slice(0, -1)+ 'евич';

        } if (x.endsWith('й') && this.person.gender === 'женщина') {
            return x.slice(0, -1) + 'евна';

        } if (this.person.gender === 'женщина') {
            return x + 'овна';
            
        } else {
            return x + 'ович'; 
        }
        
    },

// выбирает месяц из списка
randomMonth: function() {
    return this.randomValue(this.monthBirthJson);
},
//в зависимости от месяца генерирует дни в пределах количества дней в месяце
randomDay: function() {
        if (this.person.monthBirth === ' февраля '){
            return this.randomIntNumber(28, 1);
        } if (this.person.monthBirth == " апреля " || this.person.monthBirth == " июня " || this.person.monthBirth == " сентября " || this.person.monthBirth == " ноября ") {
            return this.randomIntNumber(30, 1);
        } else {
            return this.randomIntNumber(31, 1);
        }
    },

// генерирует год рождения, верхнюю границу специально взяла 2003 год, 
// т.к.позднее родившиеся дети не могут иметь еще профессии
//потем конкатенации создала год+строка
    randomBirthYear: function() {
    return (this.randomIntNumber(1955, 2003)) + ' года рождения';   
},
  
randomProfession: function() {
    if (this.person.gender === 'мужчина') {
        return "профессия: " + (this.randomValue(this.professionMaleJson));
       } else {
         return "профессия: " + (this.randomValue(this.professionFemaleJson));
        } 
},

getPerson: function () {
    this.person = {};
    this.person.gender = this.randomGender();
    this.person.firstName = this.randomFirstName();
    this.person.surname = this.randomSurname();
    this.person.monthBirth = this.randomMonth();
    this.person.patronomic = this.randomPatronomic();
    this.person.day = this.randomDay();
    this.person.birthYear = this.randomBirthYear();
    this.person.profession = this.randomProfession();
    return this.person;
}

};
    




