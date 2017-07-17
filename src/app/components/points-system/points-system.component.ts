import { Component, OnInit } from '@angular/core';
interface IPointBase {
  action: string,
  pointsString: string,
  points: number,
  help: string
}

@Component({
  selector: 'app-points-system',
  templateUrl: './points-system.component.html',
  styleUrls: ['./points-system.component.css']
})
export class PointsSystemComponent implements OnInit {


  private rolePoints = [
    {
      action: "Ruler (King or Queen)",
      pointsString: "+20% more points for your Ruler",
      help: "If 'A' is your team Ruler. If 'A' gets 10 points in a episode, then you get 20% more points of A. (i.e. 1.2 * A's_Points = 12)"
    },
    {
      action: "The Hand of the King or Queen",
      pointsString: "+10% more points for your Ruler",
      help: "If 'A' is your team Ruler. If 'A' gets 10 points in a episode, then you get 10% more points of A. (i.e. 1.1 * A's_Points = 11)"
    },
  ];

  powerPoints: IPointBase[] = [
    {
      action: "Conquer Iron Throne",
      pointsString: "200",
      points: 200,
      help: "If a character become King or Queen of 7 kingdoms",
    },
    {
      action: "Conquer a City/Kingdom",
      pointsString: "75",
      points: 75,
      help: "",
    },
    {
      action: "Become King or Queen of a Kingdom",
      pointsString: "40",
      points: 40,
      help: "Character shouldn't have been a King or Queen in the last episode.",
    },
    {
      action: "Get a Seat on the High Council",
      pointsString: "25",
      points: 25,
      help: "",
    },
    {
      action: "Sitting King or Queen of 7 Kingdom",
      pointsString: "10",
      points: 10,
      help: "Character should King or Queen currently sitting on Iron Throne. Character should appear on episode.",
    },
    {
      action: "Sitting King or Queen",
      pointsString: "5",
      points: 5,
      help: "Character should King or Queen of a Kindom. Character should appear on episode.",
    },
    {
      action: "Magic Use",
      pointsString: "50",
      points: 50,
      help: "",
    },
    {
      action: "Acquire Some Valyrian Steel",
      pointsString: "50",
      points: 50,
      help: "",
    },
    {
      action: "Have a Vision/Prophecy",
      pointsString: "20",
      points: 20,
      help: "",
    },
    {
      action: "Take up a Weird/New Religion",
      pointsString: "15",
      points: 15,
      help: "",
    },
    {
      action: "Get Engaged",
      pointsString: "10",
      points: 10,
      help: "",
    },
    {
      action: "Get Pregnant/Get Someone Pregnant",
      pointsString: "15",
      points: 15,
      help: "",
    },
    {
      action: "Lose a Baby",
      pointsString: "-20",
      points: -20,
      help: "",
    },
    {
      action: "Promotions",
      pointsString: "25",
      points: 25,
      help: "",
    },
    {
      action: "Demotions",
      pointsString: "-25",
      points: -25,
      help: "",
    },
    {
      action: "Come Back from the Dead",
      pointsString: "15",
      points: 15,
      help: "Becoming White Walker doesnt count",
    },
    {
      action: "Spare a life",
      pointsString: "20",
      points: 20,
      help: "",
    },
    {
      action: "Show Dominance",
      pointsString: "20",
      points: 20,
      help: "Show the Power with Army or skills. People show support to character.",
    },
    {
      action: "Show Weakness",
      pointsString: "-20",
      points: -20,
      help: "",
    }
  ];

  voilancePoints:IPointBase[] = [
    {
      action: "Random Kill",
      pointsString: "10*",
      points: 10,
      help: "Killing Unknown character. Max points per episode is 50",
    },
    {
      action: "Known Kill",
      pointsString: "20*",
      points: 20,
      help: "Killing Known character. Max points per episode is 100",
    },
    {
      action: "Listed Character Kill",
      pointsString: "25 + ([Level of character] * 5)",
      points: 25,
      help: "Killing Listed character in our app. Max points per episode is 200",
    },
    {
      action: "White Walker Kill",
      pointsString: "15",
      points: 15,
      help: "Killing White Walker. Max points per episode is 200",
    },
    {
      action: "Dragon Kill",
      pointsString: "200",
      points: 200,
      help: "",
    },
    {
      action: "Incapacitate Random Character",
      pointsString: "5",
      points: 5,
      help: "",
    },
    {
      action: "Incapacitate Known Character",
      pointsString: "10",
      points: 10,
      help: "",
    },
    {
      action: "Memorable Kill",
      pointsString: "50",
      points: 50,
      help: "A Character should kill someone.",
    },
    {
      action: "Memorable Death",
      pointsString: "30",
      points: 30,
      help: "A Character dies memorably",
    },
    {
      action: "Order to Kill",
      pointsString: "10",
      points: 10,
      help: "A Character dies memorably",
    },
    {
      action: "Order to Kill/Mass casualities",
      pointsString: "10",
      points: 10,
      help: "More than 5 people should die.",
    }
  ];

  boldPoints = [
    {
      action: "Hitting on Someone",
      pointsString: "5",
      points: 5,
      help: "Flirting",
    },
    {
      action: "Sex with random character",
      pointsString: "10",
      points: 10,
      help: "",
    },
    {
      action: "Sex with known character",
      pointsString: "15",
      points: 15,
      help: "",
    },
    {
      action: "Strange Relationship",
      pointsString: "15",
      points: 15,
      help: "",
    },
    {
      action: "Naked (PG-13)",
      pointsString: "5",
      points: 5,
      help: "",
    },
    {
      action: "Naked",
      pointsString: "10",
      points: 10,
      help: "",
    }
  ];

  characterPoints:IPointBase[]  = [
    {
      action: "Funny one liners",
      pointsString: "5",
      points: 5,
      help: "",
    },
    {
      action: "Give a speech",
      pointsString: "10",
      points: 10,
      help: "Give a speech about unity, encourage people, Winter/Violence/The Past",
    },
    {
      action: "Best Scene of the Week.",
      pointsString: "25",
      points: 25,
      help: "",
    },
    {
      action: "Best Dialog of the Week.",
      pointsString: "15",
      points: 15,
      help: "Which cab be remembered.",
    },
    {
      action: "First to appear on a episode.",
      pointsString: "10",
      points: 10,
      help: "",
    },
    {
      action: "Last to appear on a episode.",
      pointsString: "10",
      points: 10,
      help: "",
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
