
import * as fs from 'fs';
import Person from './person';

class PersonRepository {
    private people: Person[] = [];

    loadPeople() {
        const rawData = fs.readFileSync('./data/people.json', 'utf-8');
        const data = JSON.parse(rawData);
        this.people = data.map((p: { name: string; age: number; city: string; }) => new Person(p.name, p.age, p.city));
    }

    mapPeopleToJson(): { name: string; age: number; city: string }[] {
        return this.people.map(person => person.toJson());
    }

    savePeople(): void {
        const jsonData = JSON.stringify(this.mapPeopleToJson(), null, 2);
        fs.writeFileSync('./data/people.output.json', jsonData, 'utf-8');
    }

    getAll(): Person[] {
        return this.people;
    }
}
export default PersonRepository;
