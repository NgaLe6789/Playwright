import personrepository from './personRepository';

const repository = new personrepository();
repository.loadPeople();

repository.getAll().forEach(person => {
    person.celebrateBirthday();
    console.log(person.greet());
    console.log(`Is adult: ${person.isAdult()}`);
});

repository.savePeople();
