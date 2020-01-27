var colors = [ "red", "blue", "yellow", "green"];
var oplossing = [];
var gok = [0,0,0,0];
var aantallen_opl = [0,0,0,0];
var aantallen_gok = [0,0,0,0];
var rows = 0;
var juiste_plaatsen = 0;
var juiste_kleuren = 0;
var einde = false;

//Initialize: wordt opgeroepen in OnLoad van de body
function Initialize()
{
    //4 willekeurige getallen kiezen, en die stockeren in 'oplossing'; bv. oplossing is dan [4,3,2,4] (green, yellow, blue, green)
    oplossing = [ Random1_4(), Random1_4(), Random1_4(), Random1_4() ];

    //totaliseer het aantal 1'en, 2'en, 3'en en 4'en in de oplossing; bv. aantallen_opl = [0,1,1,2]
    for (var i=0; i <= 3 ; i++) { aantallen_opl[oplossing[i]-1]++; }

    //toon de eerste rij
    NewRow();
}

//NewRow: een nieuwe invoerrij maken; dit gebeurt 1) bij Initialisatie, en 2) bij klik op de knop 'Check'
function NewRow()
{
    //vanaf de 2de rij, antwoord controleren, en gepast reageren
    if ( rows > 0 ) CheckAnswer();

    //als het spel afgelopen is, knop Start New Game tonen
    if ( einde ) { SetNewGameButton(); return 0; }

    rows++;                                    //rijteller ophogen
    gok = [0,0,0,0];                        //gokken leegmaken

    //de inhoud van een nieuwe rij
    var HTML_rij = '<div id=rij_' + rows + ' class="row clearfix">' +
                            '<div id=g' + rows + '_1 onclick="ProcessClick(1)" class="circle"></div>' +
                            '<div id=g' + rows + '_2 onclick="ProcessClick(2)" class="circle"></div>' +
                            '<div id=g' + rows + '_3 onclick="ProcessClick(3)" class="circle"></div>' +
                            '<div id=g' + rows + '_4 onclick="ProcessClick(4)" class="circle"></div>' +
                            '</div>' ;
    AppendContent("rijen", HTML_rij); //de nieuwe rij toevoegen
}

//ProcessClick: gepast reageren op een klik op een cirkel;
// positie = 1,2,3 of 4: de eerste, tweede, derde of vierde cirkel
function ProcessClick( positie )
{
    var index = positie - 1;                  //we willen de 4 gokken bewaren in de array 'gok", maar die begint vanaf 0 te tellen
    gok[index]++;
    if ( gok[index] == 5 ) gok[index]=1;                                   //bij de laatste kleur (of getal) terug naar de eerste kleur (of getal) springen
    SetBGCol( "g" + rows + "_" + positie, gok[index] );           //toon de nieuwe kleur in de juiste cirkel
}

//CheckAnswer: vergelijkt de gok met de oplossing, en reageert gepast
function CheckAnswer()
{
    juiste_plaatsen = 0;                                                       //aantal juiste plaatsen op 0 initialiseren
    juiste_kleuren = 0;                                                         //aantal juiste kleuren (of getallen) op 0 initialiseren
    aantallen_gok = [0,0,0,0];                                           //de aantallen van elk getal (of elke kleur) op 0 initialiseren

    //aantal juiste plaatsen berekenen
    for (var i=0; i <= 3; i++)                                               //overloop de 4 ingegeven getallen
    {
        if ( gok[i] == oplossing[i] ) juiste_plaatsen++;    //totaliseer het aantal juiste plaatsen in variabele juiste_plaatsen
        aantallen_gok[gok[i]-1]++;                                     //totaliseer het aantal 1'en, 2'en, 3'en en 4'en
    }

    //aantal juiste kleuren uitrekenen
    for (var i=0; i <= 3; i++)                                              //overloop de getallen 1 tot 4 (en vergelijk hun aantallen)
    {
        juiste_kleuren += Math.min(aantallen_gok[i], aantallen_opl[i]);
    }

    //feedback tonen
    Feedback( juiste_plaatsen, (juiste_kleuren - juiste_plaatsen) );
}

//Feedback toont de zwarte en witte knopjes
function Feedback( black, white )
{
    var i ; //tellertje for-loops
    var knopjes = "<span class='somespace'></span>"; //lege ruimte

    //zwarte en witte knopjes toevoegen
    for ( i=0; i < black ; i++ ) { knopjes += "<span class='black'></span>"; }
    for ( i=0; i < white ; i++ ) { knopjes += "<span class='white'></span>"; }

    AppendContent( "rij_" + rows, knopjes );

    //einde van het spel?
    if ( black == 4 ) einde = true;
    if ( einde ) ToonOplossing();
}

//deze functie toont de oplossing (de juiste kleuren) in de eerste rij
function ToonOplossing()
{
    var cirkel_id;

    for ( var x=0; x < 4; x++)
    {
        cirkel_id = "sol" + (x+1) ;
        SetBGCol(cirkel_id, oplossing[x]);
    }
}

//Random1_4: een willekeurig geheel getal creëren tussen 1 en 4
function Random1_4()
{
    return Math.floor(Math.random()*(4)+1);
}

//ShowValue: een waarde tonen in de innerHTML van een opgegeven element op de pagina
function ShowValue( el_name, value )
{
    var el = document.getElementById(el_name);
    el.innerHTML = value;
}

//SetBGCol
function SetBGCol( el_name, color_number )
{
    var el = document.getElementById(el_name);
    el.style.backgroundColor = colors[color_number - 1];
}

//AppendContent: nieuwe inhoud (HTML) toevoegen aan de innerHTML
//van een opgegeven element op de pagina
function AppendContent( el_name, new_content )
{
    var el = document.getElementById(el_name);
    el.innerHTML += new_content;
}

//SetNewGameButton vervangt de Check knop door een Start New Game knop
function SetNewGameButton()
{
    var newgamebutton = '<div id="checkbutton" onclick="location.reload();">Start New Game</div>';
    ShowValue( "bottom_row", newgamebutton );
}