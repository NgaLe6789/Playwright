class Person{
    private name: string;
    private age: number;
    private city: string;
    constructor(name: string, age: number, city: string){
        if(!name || age <= 0){
            throw new Error("Invalid input");
        }
        this.name = name;
        this.age = age;
        this.city = city;
    }

    greet(): string{
        return `Hi, I'm ${this.name}, from ${this.city}.`;
    }

    celebrateBirthday(): void{
        this.age += 1;
    }

    updateCity(newCity: string): void{
        this.city = newCity;
    }

    isAdult(): boolean{
        return this.age >= 18;
    }

    hasSameCity(other: Person): boolean{
        return this.city === other.city;
    }

    toJson(): { name: string; age: number; city: string }{
        return {
            name: this.name,
            age: this.age,
            city: this.city
        };
    }

    fromJson(json: { name: string; age: number; city: string }): Person{
        return new Person(json.name, json.age, json.city);
    }

}
export default Person;