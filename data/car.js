class car{
  #brand;
  #model;
  speed;
  isTrunkOpen = false;
  
  constructor(CarDetails){
    this.#brand = CarDetails.brand;
    this.#model= CarDetails.model;
    this.speed = CarDetails.speed;
  }

  displayInfo(){
    const trunkStatus = this.isTrunkOpen ? "open" : "closed";
    console.log(`${this.#brand} ${this.#model} ${this.speed} km/n`);
    console.log(`${this.#brand}, ${this.#model}, ${this.speed} km/n, Trunk: ${trunkStatus}`);

  }

  go(){
    this.speed += 5;



    if(!this.isTrunkOpen){
      this.speed +=5; //if trunk is not open, increase the speed;
    }

    if(this.speed > 200){
      this.speed = 200;
    }
  }

  brake(){
    this.speed -= 5;

    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk(){
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closedTrunk(){
    this.isTrunkOpen = false;
  }
}

class RaceCar extends car{
  acceleration;

  constructor(RaceCarDetails){
    super(RaceCarDetails);
    this.acceleration = RaceCarDetails.acceleration;
  }

   go(){
     this.speed += this.acceleration;

     if(this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk(){
    console.log("Race car not have trunk");
  }

  closedTrunk(){
    console.log("Race car not have trunk");
  }

  displayInfo(){
    console.log(`model: ${this.model} brand: ${this.brand} speed: ${this.speed} trunk: null`);
  }
}


const mycar1 = new car({
  brand:"toyota",
  model:"Corolla",
  speed:200
});

const Race1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  speed:280,
  acceleration:20
});

const myCar2 = new car({
  brand: 'Tesla',
  model: 'Model 3',
  speed:103
});
console.log(mycar1);
console.log(myCar2);

mycar1.displayInfo();
myCar2.displayInfo();

mycar1.go();
mycar1.displayInfo();

mycar1.brake();
mycar1.displayInfo();

myCar2.brake();
myCar2.displayInfo();

mycar1.closedTrunk();
mycar1.displayInfo();



Race1.go();
Race1.go();
Race1.go();
Race1.displayInfo();
Race1.openTrunk();
