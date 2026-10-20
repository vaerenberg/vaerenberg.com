/* Activity details for the Tenerife Adventure Picker.
 * Prices are indicative (October 2026), not live quotes.
 * Wikimedia Commons images remain on Commons; click each photo for credits/licensing.
 */
(() => {
  'use strict';
  const photo = filename => ({
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename) + '?width=850',
    credit: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename),
    label: filename.replace(/\.[^.]+$/, '').replaceAll('_', ' ')
  });
  const D = {
    siam: {
      location:'Siam Park, Costa Adeje', lat:28.0716, lon:-16.7265,
      price:'Toegang betalend — bekijk het actuele tarief op de ticketwebsite',
      duration:'Bij voorkeur een volledige dag',
      description:'Groot waterpark met glijbanen, een golfslagbad en zones voor kleinere kinderen. We plannen dit bij voorkeur op een rustigere weekdag.',
      tips:['Reserveren op voorhand is verstandig; wachtrijen kunnen oplopen.','Controleer lengtebeperkingen per glijbaan en mogelijke Fast Pass-opties.','Neem zwemkleding, slippers en zonnebescherming mee.'],
      url:'https://www.siampark.net/',
      photos:[photo('A0455 Tenerife, Siam Park aerial view.jpg'),photo('A0461 Tenerife, Adeje and Siam Park aerial view.jpg')]
    },
    medano: {
      location:'Playa El Médano', lat:28.0437, lon:-16.5375,
      price:'Strand gratis; horeca en eventuele huur apart',
      duration:'Halve dag of langer',
      description:'Ontspannen stranddag in een levendig kustplaatsje, met een boulevard, cafés en uitzicht op Montaña Roja.',
      tips:['Het kan er behoorlijk waaien: neem een extra laagje mee.','Geschikt om flexibel met verschillende gezelschappen af te spreken.','Houd rekening met golven en de wind als kinderen gaan zwemmen.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('ES7020049 Tenerife Montaña Roja, playa de El Médano.jpg'),photo('Montaña roja desde el Medano.jpg')]
    },
    anaga: {
      location:'Cruz del Carmen, Parque Rural de Anaga (voorbeeldstartpunt)', lat:28.5323, lon:-16.2799,
      price:'Veel wandelroutes gratis; vervoer en eventuele gids apart',
      duration:'Halve tot volledige dag',
      description:'Groene bergwereld met laurierbos, nevel en vergezichten. De route kan aangepast worden aan de kinderen en het weer.',
      tips:['Smalle bochtige wegen kunnen wagenziekte uitlokken: kies een beperkte lus.','Het kan in Anaga koeler en natter zijn dan aan de zuidkust.','Controleer vooraf of een gekozen pad een reservatie of vergunning vereist.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Laurisilva en Anaga.jpg'),photo('Bosque de laurisilva en Anaga.jpg')]
    },
    teide: {
      location:'Roques de García / Mirador de La Ruleta', lat:28.2248, lon:-16.6318,
      price:'Roques de García gratis; optionele kabelbaan is betalend (actuele tarieven bij aanbieder)',
      duration:'Halve tot volledige dag',
      description:'Vulkanisch landschap met indrukwekkende rotsformaties en uitzicht op de Teide. Je hoeft niet de kabelbaan te nemen om dit te beleven.',
      tips:['De wegen zijn bochtig; plan stops en voldoende tijd vanwege wagenziekte.','Op hoogte kan het koud en winderig zijn.','Voor de kabelbaan gelden aparte tickets en soms toegangsregels voor routes nabij de top.'],
      url:'https://www.volcanoteide.com/es/teleferico_del_teide/tarifas_y_horarios',
      photos:[photo('Roques de García.jpg'),photo('Los Roques de García y el Teide 01.jpg')]
    },
    chinyero: {
      location:'Montaña Chinyero (indicatieve locatie; vertrekpunt nog te kiezen)', lat:28.294, lon:-16.754,
      price:'Vrij wandelen doorgaans gratis',
      duration:'2–4 uur, afhankelijk van route',
      description:'Rustiger wandelgebied met donkere lavavelden, dennenbomen en vulkanische uitzichten.',
      tips:['Kies een korte lus die haalbaar is voor de jongste kinderen.','Draag gesloten wandelschoenen op de lavapaden.','Er zijn weinig voorzieningen op de route: neem water en snacks mee.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Chinyero y lavas.jpg'),photo('Chinyero volcano with view to Mount Teide on Tenerife, Spain (48225194316).jpg')]
    },
    boat: {
      location:'Puerto Colón, Costa Adeje (voorbeeldvertrekhaven)', lat:28.0784, lon:-16.7352,
      price:'Indicatief vanaf €25–35 per volwassene voor korte tochten; kinderen afhankelijk van aanbieder',
      duration:'Meestal 1,5–3 uur',
      description:'Op zoek naar grienden en dolfijnen vanaf de zuidkust. Dieren spotten blijft natuurlijk nooit gegarandeerd.',
      tips:['Zeeziekte is voor een aantal deelnemers een belangrijk aandachtspunt: overweeg een korte tocht op een stabieler schip.','Kies een erkende aanbieder die dieren respectvol benadert.','Het exacte vertrekpunt hangt af van de geboekte boot.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Globicephala macrorhynchus Tenerife 2012 (cropped).jpg'),photo('Ballenas Tenerife.jpg')]
    },
    snorkel: {
      location:'Playa de las Vistas, Los Cristianos (mogelijke locatie)', lat:28.0534, lon:-16.7255,
      price:'Gratis met eigen materiaal; begeleide excursie of huur extra',
      duration:'1–3 uur',
      description:'De onderwaterwereld ontdekken in een beschutte baai of tijdens een begeleide activiteit.',
      tips:['Kies een rustige plek en beoordeel de zeecondities ter plaatse.','Een begeleide sessie kan prettiger zijn voor kinderen zonder snorkelervaring.','De aangeduide locatie is een suggestie, geen vastgelegde excursie.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Los Cristianos.jpg'),photo('ES7020049 Tenerife Montaña Roja, playa de El Médano.jpg')]
    },
    kayak: {
      location:'Los Cristianos (voorbeeldvertrekpunt)', lat:28.0484, lon:-16.7207,
      price:'Afhankelijk van gids, duur en materiaalhuur',
      duration:'Doorgaans 1,5–3 uur',
      description:'Met een kajak langs de kust, alleen als de zee rustig is en de aanbieder geschikte kinderopties heeft.',
      tips:['Controleer minimumleeftijd en zwemvaardigheid vooraf.','Zeeziekte en golfslag kunnen de ervaring minder aangenaam maken.','Kies een begeleide tour en laat de weersomstandigheden beslissen.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Tenerife cristianos puerto E.jpg'),photo('Tenerife cristianos puerto B.jpg')]
    },
    stars: {
      location:'Parque Nacional del Teide (indicatief)', lat:28.255, lon:-16.616,
      price:'Zelf sterren kijken gratis; gids of georganiseerde excursie extra',
      duration:'1–3 uur in de avond',
      description:'Op heldere avonden kan de hoge ligging schitterende sterrenhemels opleveren, ver van de lichtvervuiling.',
      tips:['In november kan het ’s avonds erg koud zijn op hoogte.','Rijd niet vermoeid terug over de bergwegen.','Check bewolking, maanstand en veilige parkeer-/uitkijklocaties.'],
      url:'https://www.volcanoteide.com/',
      photos:[photo('Milky way stack.jpg'),photo('Lightning and the Milky way.jpg')]
    },
    laguna: {
      location:'Historisch centrum San Cristóbal de La Laguna', lat:28.488, lon:-16.315,
      price:'Stadswandeling gratis; musea, eten en drinken apart',
      duration:'2–5 uur',
      description:'Een UNESCO-werelderfgoedstad met kleurrijke gevels, pleinen, winkels en gezellige adresjes om iets te eten.',
      tips:['Ideaal als afwisseling met strand en natuur.','Combineer desgewenst met een korte wandeling of een museum.','Door de hogere ligging kan het koeler zijn dan aan de kust.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('San Cristóbal de La Laguna.jpg'),photo('San Cristóbal de la Laguna (87506).jpg')]
    },
    pool: {
      location:'Alborada Ocean Club, Costa del Silencio (te bevestigen)', lat:28.0085, lon:-16.644,
      price:'Afhankelijk van verblijfsformule of eventuele dagtoegang; vooraf navragen',
      duration:'Enkele uren tot een dag',
      description:'Een rustige zwembaddag zonder grote verplaatsing, ideaal als pauze tussen de uitstappen.',
      tips:['Controleer of het zwembad daadwerkelijk toegankelijk is voor jullie gezelschap.','Opening, onderhoud en eventuele toegangsprijzen kunnen veranderen.','De kaartpin is een indicatie van het complex, niet van een specifieke ingang.'],
      url:'https://www.google.com/maps/search/?api=1&query=Alborada+Ocean+Club+Tenerife',
      photos:[]
    },
    dinner: {
      location:'Nog te kiezen — zuidkust van Tenerife (indicatieve kaartlocatie)', lat:28.062, lon:-16.730,
      price:'Afhankelijk van restaurant en groepsgrootte',
      duration:'1–3 uur',
      description:'Een gezamenlijke lunch of avond met de familie en vrienden. De precieze locatie kiezen we later samen.',
      tips:['Reserveer voor een grotere groep bij voorkeur vooraf.','Kies een kindvriendelijke plaats met genoeg keuze.','De kaartpin toont alleen een zoekgebied, geen gereserveerd restaurant.'],
      url:'https://www.google.com/maps/search/?api=1&query=restaurants+Costa+Adeje+Tenerife',
      photos:[]
    }
  };
  const $ = id => document.getElementById(id);
  const modal = $('activityDialog');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[char]));
  let lastFocus = null;
  window.openTenerifeDetails = id => {
    const d=D[id],activity=window.TENERIFE_ACTIVITY_LIST?.find(a=>a[0]===id);
    if(!d||!activity)return;
    lastFocus=document.activeElement;
    $('activityDialogTitle').textContent=activity[1]+' '+activity[2];
    $('activityDialogBody').innerHTML=
      '<p>'+safe(d.description)+'</p>'+
      (d.photos.length?'<div class="detail-gallery">'+d.photos.map(p=>
        '<img src="'+p.src+'" loading="lazy" alt="'+safe(p.label)+'" referrerpolicy="no-referrer">').join('')+'</div>'+
        '<details class="detail-credits"><summary>Fotobronnen en licenties</summary><ul>'+
        d.photos.map(p=>'<li><a href="'+p.credit+'" target="_blank" rel="noopener noreferrer">'+safe(p.label)+'</a> — Wikimedia Commons</li>').join('')+
        '</ul></details>'
        :'<p class="detail-hint">Voor deze nog niet vastgelegde activiteit zijn er geen specifieke foto’s geselecteerd.</p>')+
      '<div class="detail-facts"><div><strong>💶 Prijs</strong><p>'+safe(d.price)+'</p></div>'+
      '<div><strong>⏱️ Tijdsduur</strong><p>'+safe(d.duration)+'</p></div></div>'+
      '<h3>Goed om te weten</h3><ul>'+d.tips.map(t=>'<li>'+safe(t)+'</li>').join('')+'</ul>'+
      '<h3>📍 '+safe(d.location)+'</h3>'+
      '<iframe class="detail-map" title="Kaart van '+safe(d.location)+'" loading="lazy" referrerpolicy="no-referrer" src="'+
         'https://www.openstreetmap.org/export/embed.html?bbox='+
         (d.lon-.1)+','+(d.lat-.072)+','+(d.lon+.1)+','+(d.lat+.072)+
         '&layer=mapnik&marker='+d.lat+','+d.lon+'"></iframe>'+
      '<p class="detail-links"><a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/?mlat='+d.lat+'&mlon='+d.lon+'#map=13/'+d.lat+'/'+d.lon+'">Grotere kaart ↗</a> · '+
      '<a target="_blank" rel="noopener noreferrer" href="'+d.url+'">Meer informatie / aanbieder ↗</a></p>'+
      '<p class="detail-hint">Prijzen zijn indicaties, geen offertes. Controleer tarieven, leeftijdsgrenzen, openingstijden en eventuele reservaties voor vertrek. Kaartpins voor uitstappen zonder vaste locatie zijn voorbeelden.</p>';
    // A previous dialog may have left the scrollable content halfway down.
    $('activityDialogBody').scrollTop = 0;
    modal.scrollTop = 0;
    modal.showModal();
    modal.scrollTop = 0;
    $('activityDialogBody').scrollTop = 0;
  };
  modal.addEventListener('click', event => {if(event.target===modal)modal.close()});
  modal.addEventListener('close',()=>lastFocus?.focus());
  $('activityDialogClose').addEventListener('click',()=>modal.close());
})();