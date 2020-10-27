class Judge {
    constructor(name, age, isMale, stance, isAlive = true) {
        this.name = name;
        this.age = age;
        this.isMale = isMale
        this.stance = stance;
        this.isAlive = isAlive;
        this.maleDR = {'26':0.001665,'27':0.001717,'28':0.001767,'29':0.001817,'30':0.001865,'31':0.001911,'32':0.00196,'33':0.002014,'34':0.002071,'35':0.002138,'36':0.002211,'37':0.002279,'38':0.002342,'39':0.002405,'40':0.002482,'41':0.002583,'42':0.00271,'43':0.00287,'44':0.003064,'45':0.003285,'46':0.003538,'47':0.003834,'48':0.004178,'49':0.004569,'50':0.004997,'51':0.005462,'52':0.005971,'53':0.006526,'54':0.007125,'55':0.007766,'56':0.008445,'57':0.009156,'58':0.009897,'59':0.010671,'60':0.011519,'61':0.012419,'62':0.013307,'63':0.014164,'64':0.015032,'65':0.016013,'66':0.017138,'67':0.018362,'68':0.019693,'69':0.021174,'70':0.022889,'71':0.024869,'72':0.027095,'73':0.029587,'74':0.032394,'75':0.035668,'76':0.039396,'77':0.043453,'78':0.047826,'79':0.052649,'80':0.058206,'81':0.064581,'82':0.071657,'83':0.079465,'84':0.088141,'85':0.097854,'86':0.108747,'87':0.120919,'88':0.134425,'89':0.149273,'90':0.165452,'91':0.182935,'92':0.201679,'93':0.221637,'94':0.242747,'95':0.263672,'96':0.284014,'97':0.303355,'98':0.321268,'99':0.337332,'100':0.354198,'101':0.371908,'102':0.390503,'103':0.410029,'104':0.43053,'105':0.452057,'106':0.474659,'107':0.498392,'108':0.523312,'109':0.549478,'110':0.576951,'111':0.605799,'112':0.636089,'113':0.667893,'114':0.701288,'115':0.736353,'116':0.77317,'117':0.811829,'118':0.85242,'119':0.895041};
        this.femaleDR = {'26':0.000646,'27':0.000684,'28':0.000729,'29':0.000779,'30':0.000833,'31':0.000887,'32':0.000939,'33':0.000988,'34':0.001034,'35':0.001085,'36':0.001143,'37':0.001205,'38':0.001271,'39':0.001345,'40':0.001429,'41':0.001524,'42':0.00163,'43':0.001748,'44':0.001881,'45':0.002029,'46':0.002195,'47':0.002386,'48':0.002605,'49':0.002851,'50':0.003118,'51':0.003403,'52':0.003714,'53':0.004052,'54':0.004415,'55':0.004813,'56':0.005233,'57':0.005647,'58':0.006043,'59':0.006441,'60':0.006886,'61':0.007391,'62':0.007931,'63':0.008508,'64':0.009142,'65':0.009874,'66':0.010717,'67':0.01166,'68':0.012711,'69':0.013894,'70':0.015285,'71':0.016878,'72':0.018607,'73':0.020466,'74':0.022522,'75':0.024929,'76':0.027729,'77':0.030855,'78':0.034321,'79':0.038211,'80':0.042771,'81':0.047992,'82':0.053678,'83':0.05981,'84':0.066584,'85':0.074258,'86':0.083053,'87':0.093123,'88':0.10454,'89':0.117305,'90':0.131392,'91':0.146753,'92':0.163331,'93':0.181064,'94':0.199886,'95':0.218908,'96':0.237815,'97':0.256265,'98':0.273894,'99':0.290328,'100':0.307747,'101':0.326212,'102':0.345785,'103':0.366532,'104':0.388524,'105':0.411835,'106':0.436546,'107':0.462738,'108':0.490503,'109':0.519933,'110':0.551129,'111':0.584196,'112':0.619248,'113':0.656403,'114':0.695787,'115':0.736353,'116':0.77317,'117':0.811829,'118':0.85242,'119':0.895041};
    }
    
    ageForward(eventLog){
        this.age++;
        var deathRate;
        if(this.isMale) {
            deathRate = this.maleDR[this.age];
        } else {
            deathRate = this.femaleDR[this.age];
        }
        var rand = Math.random(0,1);
        if(rand < deathRate) {
         this.isAlive = false;
         eventLog.push(this.name + 'died');
        }
    }
    
}

class Senate {
    constructor(conservativeMajority = 0.52, isConservative = true){
        this.conservativeMajority = conservativeMajority;
        this.isConservative = isConservative;
    }
    
    age(){
     var rand = Math.random();
     if(rand <= this.conservativeMajority){
         this.isConservative = true
     } else {
         this.isConservative = false;
     }
    }
}

class President {
    constructor(conservativeMajority = 0.50, isConservative = true){
        this.conservativeMajority = conservativeMajority;
        this.isConservative = isConservative;
    }
    
    age(){
     var rand = Math.random();
     if(rand <= this.conservativeMajority){
         this.isConservative = true
     } else {
         this.isConservative = false;
     }
    }
}

class Court {
    constructor(judges = [], courtSize = 9){
        this.judges = judges;
        this.courtSize = courtSize;
    }
    
    age(eventLog){
        this.judges.forEach(judge => judge.ageForward(eventLog));
        this.judges = this.judges.filter(judge => judge.isAlive);
    }
    
    hasVacancy(){
        return this.judges.length < this.courtSize;
    }
    
    numberOfVacancy(){
        return this.courtSize - this.judges.length;
    }
    
    createCurrentCourt(allowModerate){
        var robert;
        if(allowModerate){
         robert = new Judge('John Roberts', 65, true, 'Moderate');   
        } else {
         robert = new Judge('John Roberts', 65, true, 'Conservative');   
        }
        let thomas = new Judge('Clarence Thomas', 72, true, 'Conservative');
        let breyer = new Judge('Stephen Breyer', 82, true, 'Liberal');
        let alito = new Judge('Samuel Alito', 70, true, 'Conservative');
        let sotomayor = new Judge('Sonia Sotomajor', 66, false, 'Liberal');
        let kagan = new Judge('Elena Kagan', 60, false, 'Liberal');
        let gorsuch = new Judge('Neil Gorsuch', 53, true, 'Conservative');
        let kavanaugh = new Judge('Brett Kavanaugh', 55, true, 'Conservative');
        let barret = new Judge('Amy Barret', 76, true, 'Conservative');
        this.judges = [robert, alito, barret, thomas, breyer, sotomayor, kagan, gorsuch, kavanaugh];                    
    }
    
    appointNewRandomJudge(stance){
        let age = Math.floor(Math.random(0.45,0.65)*100);
        let genderChance = Math.random(0,0.3);
        let isMale = genderChance > 0.3 ? true : false;
        let judgeName = 'Circut Judge ' + Math.floor(Math.random()*100).toString();
        this.judges.push(new Judge(judgeName, age, isMale, stance));
    }
    
    appointNewJudgeUntilPacked(stance){
        let v = this.numberOfVacancy();
        for(var i = 0; i < v; i++){
            this.appointNewRandomJudge(stance);
        }
    }
    
    getJudgeCountByStance(stance){
        return this.judges.filter((judge)=>judge.stance === stance).length;
    }
    
    describeCurrentCourt(){
        return "Conservative: " + this.getJudgeCountByStance("Conservative") +
        "Liberal: " + this.getJudgeCountByStance("Liberal") +
        "Moderate: " + this.getJudgeCountByStance("Moderate");
    }
    
    isLiberalMajority(){
        return this.getJudgeCountByStance("Liberal") > this.getJudgeCountByStance("Conservative");
    }
}

class Simulation {
    constructor(president, senate, court, endYear = 2121, allowModerate = false, majorityCallback, yearcallback){
        this.president = president;
        this.senate = senate;
        this.court = court;
        this.year = 2021;
        this.endYear = endYear;
        this.eventLog = [];
        this.allowModerate = allowModerate;
        this.majorityCallback = majorityCallback;
        this.hasReachedLiberalMajority = false;
        this.yearcallback = yearcallback;
    }
    
    age(){
        //console.log("year: " + this.year);
        this.court.age(this.eventLog);
        if(this.allowModerate){
         this.appoint();   
        } else {
         this.appointWithoutModerate()
        }
        
        if(this.year % 4 === 0){
            this.president.age();
        }
        if(this.year % 2 === 0) {
            this.senate.age();
        }
        
        if(this.court.isLiberalMajority() && this.hasReachedLiberalMajority === false){
            //console.log('liberal majorty reached at year' + this.year);
            this.majorityCallback(this.year - 2021);
            this.hasReachedLiberalMajority = true;
        }
        
        this.year++;
        //this.eventLog.forEach(console.log);
        let time = this.year - 2021;
        if(time == 25 || time == 50 || time == 100){
            this.yearcallback(time, this.court.getJudgeCountByStance('Conservative'), this.court.getJudgeCountByStance('Liberal'), this.court.getJudgeCountByStance('Moderate'))
        }
        this.eventLog = []
        if(this.year < this.endYear){
            this.age();
        }
    }
    
    appoint(){
        if(this.court.hasVacancy()){
            if(this.president.isConservative && this.senate.isConservative){
                this.court.appointNewJudgeUntilPacked('Conservative');
            } else if (!this.president.isConservative && !this.senate.isConservative) {
                this.court.appointNewJudgeUntilPacked('Liberal');
            } else {
                //skip if it's election year
                if(this.year % 4 !== 0){
                    this.court.appointNewJudgeUntilPacked('Moderate');
                }
            }
            this.eventLog.push(this.court.describeCurrentCourt());
        }
    }
    
    appointWithoutModerate(){
        if(this.court.hasVacancy()){
            if(this.president.isConservative && this.senate.isConservative){
                this.court.appointNewJudgeUntilPacked('Conservative');
            } else if (!this.president.isConservative && !this.senate.isConservative) {
                this.court.appointNewJudgeUntilPacked('Liberal');
            } else {
                //skip if it's election year
                if(this.year % 4 !== 0){
                    if(this.president.isConservative){
                        this.court.appointNewJudgeUntilPacked('Conservative');
                    } else {
                        this.court.appointNewJudgeUntilPacked('Liberal');
                    }
                }
            }
            this.eventLog.push(this.court.describeCurrentCourt());
        }
    }
    
}
