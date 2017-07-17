import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent implements OnInit {



    //         .player-card:nth-child(16){
    //     background: url(#{$assetPath}/hound.jpg) no-repeat center;  
    // }
    //         .player-card:nth-child(17){
    //     background: url(#{$assetPath}/davos-seaworth.jpg) no-repeat center;  
    // }
    //         .player-card:nth-child(18){
    //     background: url(#{$assetPath}/jorah-mormont.jpg) no-repeat center;  
    // }
    //         .player-card:nth-child(19){
    //     background: url(#{$assetPath}/ellaria-sand.jpg) no-repeat center;  
    // }
    //         .player-card:nth-child(20){
    //     background: url(#{$assetPath}/olenna-tyrell.jpg) no-repeat center;  
    // }
    //             .player-card:nth-child(21){
    //     background: url(#{$assetPath}/tormund.jpg) no-repeat center;  
    // }
    //             .player-card:nth-child(22){
    //     background: url(#{$assetPath}/samwell-tarly.jpg) no-repeat center;  
    // }
    //                 .player-card:nth-child(23){
    //     background: url(#{$assetPath}/qyburn.jpg) no-repeat center;  
    // }

    //                     .player-card:nth-child(24){
    //     background: url(#{$assetPath}/lyanna.png) no-repeat left;  
    // }


 players  = [
            {
                id: "1001",
                level: 5,
                name: 'Jon Snow',
                img: './../../assets/images/jon-snow.jpg',
            },
            {
                id: "1002",
                level: 5,
                name: 'Daenerys Targaryen',
                img: './../../assets/images/daenerys.jpg',
            },
            {
                id: "1003",
                level: 5,
                name: 'Cersei Lannister',
                img: './../../assets/images/cersei.png',
            },
            {
                id: "1004",
                level: 5,
                name: 'Night King',
                img: './../../assets/images/night-king.png',
            },
            {
                id: "1005",
                level: 4,
                name: 'Sansa Stark',
                img: './../../assets/images/sansa.jpg',
            },
            {
                id: "1006",
                level: 4,
                name: 'Arya Stark',
                img: './../../assets/images/arya.jpg',
            },
            {
                id: "1007",
                level: 4,
                name: 'Bran Stark',
                img: './../../assets/images/Bran.jpg',
            },
            {
                id: "1008",
                level: 4,
                name: 'Jamie Lannister',
                img: './../../assets/images/jamie.jpg',
            },
            {
                id: "1009",
                level: 4,
                name: 'Tyrion Lannister',
                img: './../../assets/images/tyrion.jpg',
            },
            {
                id: "1010",
                level: 4,
                name: 'Euron Greyjoy',
                img: './../../assets/images/euron-greyjoy.jpg',
            },


            {
                id: "1011", level: 3,
                name: 'Bronn',
                img: './../../assets/images/bronn.jpg',
            },
            {
                id: "1012", level: 3,
                name: 'Melisandre',
                img: './../../assets/images/melisandre.jpg',
            },
            {
                id: "1013", level: 3,
                name: 'Theon Greyjoy',
                img: './../../assets/images/theon-greyjoy.jpg',
            },

            {
                id: "1014", level: 3,
                name: 'Yara Greyjoy',
                img: './../../assets/images/yara-greyjoy.jpg',
            },
            {
                id: "1015", level: 3,
                name: 'Brienne',
                img: './../../assets/images/brienne.jpg',
            },
            {
                id: "1016", level: 3,
                name: 'Hound',
                img: './../../assets/images/hound.jpg',
            },
            {
                id: "1017", level: 3,
                name: 'Davos',
                img: './../../assets/images/davos-seaworth.jpg',
            },
            {
                id: "1018", level: 3,
                name: 'Jorah Mormont',
                img: './../../assets/images/jorah-mormont.jpg',
            },
            {
                id: "1019", level: 3,

                name: 'Grey Worm',
                img: './../../assets/images/grey-worm.jpg',
            },
            {
                id: "1020", level: 3,
                name: 'Tormund',
                img: './../../assets/images/tormund.jpg',
            },





            {
                id: "1022", level: 2,
                name: 'Missandei',
                img: './../../assets/images/missandei.jpg',
            },

            {
                id: "1023", level: 2,

                name: 'Petyr Baelish',
                img: './../../assets/images/littlefinger.jpg',
            },
            {
                id: "1024", level: 2,

                name: 'Varys',
                img: './../../assets/images/varys.jpg',
            },
            
            {
                id: "1025", level: 2,
                name: 'Samwell Tarly',
                img: './../../assets/images/samwell-tarly.jpg',
            },

            

            {
                id: "1021", level: 1,
                name: 'Lyanna Mormont',
                img: './../../assets/images/lyanna.jpg',
            },

            {
                id: "1026", level: 1,

                name: 'Ellaria Sand',
                img: './../../assets/images/ellaria-sand.jpg',
            },
            {
                id: "1027", level: 1,
                name: 'Olenna Tyrell',
                img: './../../assets/images/olenna-tyrell.jpg',
            },

            {
                id: "1028", level: 1,
                name: 'Qyburn',
                img: './../../assets/images/qyburn.jpg',
            },
        ];

  themeSource = '../../../assets/music/got_theme_01.mp3'

  constructor() { }

  ngOnInit() {
  }

}

export interface IPlayer {
  name: String,
  img: String
}