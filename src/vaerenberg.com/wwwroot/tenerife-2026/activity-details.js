/* Activity details for the Tenerife Adventure Picker.
 * Prices are indicative (October 2026), not live quotes.
 * Wikimedia Commons images remain on Commons; source and license links are listed separately.
 */
(() => {
  'use strict';
  const photoUrl = (filename, width) => 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename) + '?width=' + width;
  const photo = (filename, label = filename.replace(/\.[^.]+$/, '').replaceAll('_', ' '), attribution = '') => ({
    src: photoUrl(filename, 960),
    srcset: [330, 960, 1280].map(width => photoUrl(filename, width) + ' ' + width + 'w').join(', '),
    credit: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(filename),
    label,
    attribution
  });
  const D = {
    siam: {
      location:'Siam Park, Costa Adeje', lat:28.0716, lon:-16.7265,
      price:'Toegang betalend — bekijk het actuele tarief op de ticketwebsite',
      duration:'Bij voorkeur een volledige dag',
      description:'Groot waterpark met glijbanen, een golfslagbad en zones voor kleinere kinderen. Donderdag 5 november is de voorkeursdag, eventueel samen met de Soonsen; woensdag of vrijdag blijft een alternatief.',
      tips:['Reserveren op voorhand is verstandig; wachtrijen kunnen oplopen.','Controleer lengtebeperkingen per glijbaan en mogelijke Fast Pass-opties.','Neem zwemkleding, slippers en zonnebescherming mee.'],
      url:'https://www.siampark.net/',
      photos:[
        {src:'images/siam-park-tube-slide.jpg',label:'Met een tweepersoonsband uit een groene glijbaan in Siam Park'},
        {src:'images/siam-park-tower-slide.jpg',label:'Een bezoeker op de steile waterglijbaan in Siam Park'}
      ]
    },
    medano: {
      location:'Playa El Médano', lat:28.0437, lon:-16.5375,
      price:'Strand gratis; horeca en eventuele huur apart',
      duration:'Halve dag of langer',
      description:'Ontspannen stranddag in een levendig kustplaatsje, met een boulevard, cafés en uitzicht op Montaña Roja.',
      tips:['Het kan er behoorlijk waaien: neem een extra laagje mee.','Geschikt om flexibel met verschillende gezelschappen af te spreken.','Houd rekening met golven en de wind als kinderen gaan zwemmen.'],
      url:'https://www.webtenerife.com/',
      photos:[
        {src:'images/el-medano-promenade.jpg',label:'De boulevard van El Médano met kleurrijke gebouwen en het strand'},
        {src:'images/el-medano-beach.jpg',label:'Het zandstrand bij El Médano met uitzicht op Montaña Roja'}
      ]
    },
    anaga: {
      location:'Cruz del Carmen, Parque Rural de Anaga (voorbeeldstartpunt)', lat:28.5323, lon:-16.2799,
      price:'Veel wandelroutes gratis; vervoer en eventuele gids apart',
      duration:'Halve tot volledige dag',
      description:'Groene bergwereld met laurierbos, nevel en vergezichten. De route kan aangepast worden aan de kinderen en het weer.',
      tips:['Voor El Pijaral is een vergunning vereist; als die niet beschikbaar is, kies een vergunningsvrije gezinsroute bij Cruz del Carmen. Smalle bochtige wegen kunnen wagenziekte uitlokken.','Het kan in Anaga koeler en natter zijn dan aan de zuidkust.','Controleer vooraf of een gekozen pad een reservatie of vergunning vereist.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Laurisilva en Anaga.jpg'),photo('Bosque de laurisilva en Anaga.jpg')]
    },
    teide: {
      location:'Roques de García / Mirador de La Ruleta', lat:28.2248, lon:-16.6318,
      price:'Roques de García gratis; optionele kabelbaan is betalend (actuele tarieven bij aanbieder)',
      duration:'Halve tot volledige dag',
      description:'Vulkanisch landschap met indrukwekkende rotsformaties en uitzicht op de Teide. Je hoeft niet de kabelbaan te nemen om dit te beleven.',
      tips:['De wegen zijn bochtig; plan stops en voldoende tijd vanwege wagenziekte.','Vrijdag 6 november is een voorkeursdag. Een zonsondergang en sterren kijken kan als weer en energie van de kinderen het toelaten. Op hoogte kan het koud en winderig zijn.','Voor de kabelbaan gelden aparte tickets en soms toegangsregels voor routes nabij de top.'],
      url:'https://www.volcanoteide.com/es/teleferico_del_teide/tarifas_y_horarios',
      photos:[photo('Roques de García.jpg'),photo('Los Roques de García y el Teide 01.jpg')]
    },
    chinyero: {
      location:'Montaña Chinyero (indicatieve locatie; vertrekpunt nog te kiezen)', lat:28.294, lon:-16.754,
      price:'Vrij wandelen doorgaans gratis',
      duration:'2–4 uur, afhankelijk van route',
      description:'Rustiger wandelgebied met donkere lavavelden, dennenbomen en vulkanische uitzichten.',
      tips:['Chinyero is een optionele keuzedag op zaterdag 7 november, niet nog een verplichte lange wandeling. Kies een korte lus die haalbaar is voor de jongste kinderen.','Draag gesloten wandelschoenen op de lavapaden.','Er zijn weinig voorzieningen op de route: neem water en snacks mee.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Chinyero y lavas.jpg'),photo('Chinyero volcano with view to Mount Teide on Tenerife, Spain (48225194316).jpg')]
    },
    boat: {
      location:'Voor de kust van Costa Adeje, bij Puerto Colón (indicatieve locatie)', lat:28.0784, lon:-16.7400,
      price:'Indicatief vanaf €25–35 per volwassene voor korte tochten; kinderen afhankelijk van aanbieder',
      duration:'Meestal 1,5–3 uur',
      description:'Op zoek naar grienden en dolfijnen vanaf de zuidkust. Dit is géén vaste uitstap: alleen overwegen bij zeer rustige zee en als iedereen zin heeft. Dieren spotten blijft nooit gegarandeerd.',
      tips:['Griet en de kinderen zijn gevoelig voor zeeziekte. Overweeg hoogstens een korte tocht van circa twee uur met toilet, schaduw en soepele annulering, en alleen bij rustige zee.','Kies een erkende aanbieder die dieren respectvol benadert.','Het exacte vertrekpunt hangt af van de geboekte boot.'],
      url:'https://www.webtenerife.com/',
      photos:[photo('Globicephala macrorhynchus Tenerife 2012 (cropped).jpg'),photo('Ballenas Tenerife.jpg')]
    },
    snorkel: {
      location:'Aan de kust bij Los Cristianos (mogelijke snorkellocatie)', lat:28.0455, lon:-16.7155,
      price:'Gratis met eigen materiaal; begeleide excursie of huur extra',
      duration:'1–3 uur',
      description:'De onderwaterwereld ontdekken in een beschutte baai of tijdens een begeleide activiteit.',
      tips:['Kies een rustige plek en beoordeel de zeecondities ter plaatse.','Een begeleide sessie kan prettiger zijn voor kinderen zonder snorkelervaring.','De aangeduide locatie is een suggestie, geen vastgelegde excursie.'],
      url:'https://www.webtenerife.com/',
      photos:[
        {src:'images/snorkel-fish.jpg',label:'Een snorkelaar tussen kleurrijke vissen in helder zeewater'},
        {src:'images/snorkel-turtle.jpg',label:'Snorkelaars bij een zeeschildpad onder water'}
      ]
    },
    kayak: {
      location:'Aan de kust bij Los Cristianos (mogelijke kajaklocatie)', lat:28.0450, lon:-16.7180,
      price:'Afhankelijk van gids, duur en materiaalhuur',
      duration:'Doorgaans 1,5–3 uur',
      description:'Met een kajak langs de kust, alleen als de zee rustig is en de aanbieder geschikte kinderopties heeft.',
      tips:['Controleer minimumleeftijd en zwemvaardigheid vooraf.','Zeeziekte en golfslag kunnen de ervaring minder aangenaam maken.','Kies een begeleide tour en laat de weersomstandigheden beslissen.'],
      url:'https://www.webtenerife.com/',
      photos:[
        {src:'images/kayak-coast.jpg',label:'Kajakkers op helder zeewater langs een rotsachtige kust'},
        {src:'images/kayak-dolphins.jpg',label:'Kajakkers op zee met dolfijnen en kliffen op de achtergrond'}
      ]
    },
    stars: {
      location:'Parque Nacional del Teide (indicatief)', lat:28.255, lon:-16.616,
      price:'Zelf sterren kijken gratis; gids of georganiseerde excursie extra',
      duration:'1–3 uur in de avond',
      description:'Sterren kijken is een optionele bonus na de Teide-uitstap, niet nog een vaste avondactiviteit. Op heldere avonden levert de hoge ligging schitterende sterrenhemels op.',
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
      location:'Ona Alborada, Las Galletas (verblijf)', lat:28.0085, lon:-16.644,
      price:'Afhankelijk van verblijfsformule of eventuele dagtoegang; vooraf navragen',
      duration:'Enkele uren tot een dag',
      description:'Een rustige zwembaddag bij onze uitvalsbasis in Ona Alborada, ideaal als ontspannen start en als pauze tussen uitstappen.',
      tips:['Controleer of het zwembad daadwerkelijk toegankelijk is voor jullie gezelschap.','Opening, onderhoud en eventuele toegangsprijzen kunnen veranderen.','De kaartpin is een indicatie van het complex, niet van een specifieke ingang.'],
      url:'https://www.google.com/maps/search/?api=1&query=Ona+Alborada+Las+Galletas',
      photos:[
        {src:'images/alborada-pool-overview.jpg',label:'Overzicht van het grote zwembad van Alborada direct aan zee'},
        {src:'images/alborada-pool-terrace.jpg',label:'Het zwembad van Alborada met ligbedden, parasols en uitzicht op zee'}
      ]
    },
    dinner: {
      location:'Costa del Silencio (restaurant nog te kiezen)', lat:28.0078, lon:-16.6439,
      price:'Afhankelijk van restaurant en groepsgrootte',
      duration:'1–3 uur',
      description:'Een gezamenlijke lunch of avond met de familie en vrienden in Costa del Silencio. Het restaurant kiezen we later samen.',
      tips:['Reserveer voor een grotere groep bij voorkeur vooraf.','Kies een kindvriendelijke plaats met genoeg keuze.','De kaartpin toont alleen een zoekgebied, geen gereserveerd restaurant.'],
      url:'https://www.google.com/maps/search/?api=1&query=restaurants+Costa+Adeje+Tenerife',
      photos:[
        {src:'images/dinner-tapas.jpg',label:'Een tafel met tapas, olijven, zeevruchten en een glas rode wijn'},
        {src:'images/dinner-seaside.jpg',label:'Hapjes en drankjes op een terras met uitzicht op zee'}
      ]
    }
  };
  window.TENERIFE_ACTIVITY_LOCATIONS = Object.entries(D).map(([id, detail]) => ({id, lat:detail.lat, lon:detail.lon, location:detail.location}));
  const $ = id => document.getElementById(id);
  const modal = $('activityDialog');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;',"'":'&#39;'}[char]));
  let lastFocus = null;
  window.openTenerifeDetails = id => {
    const d=D[id],activity=window.TENERIFE_ACTIVITY_LIST?.find(a=>a[0]===id);
    if(!d||!activity)return;
    const photoCredits=d.photos.filter(p=>p.credit);
    lastFocus=document.activeElement;
    $('activityDialogTitle').textContent=activity[1]+' '+activity[2];
    $('activityDialogBody').innerHTML=
      '<p>'+safe(d.description)+'</p>'+
      (d.photos.length?'<div class="detail-gallery">'+d.photos.map(p=>
        '<img src="'+safe(p.src)+'"'+(p.srcset?' srcset="'+safe(p.srcset)+'" sizes="(max-width: 500px) calc(92vw - 40px), (max-width: 771px) calc(46vw - 25px), 330px"':'')+' loading="lazy" decoding="async" alt="'+safe(p.label)+'" referrerpolicy="no-referrer">').join('')+'</div>'+
        (d.photoNote?'<p class="detail-hint">'+safe(d.photoNote)+'</p>':'')+
        (photoCredits.length?'<details class="detail-credits"><summary>Fotobronnen en licenties</summary><ul>'+
        photoCredits.map(p=>'<li><a href="'+p.credit+'" target="_blank" rel="noopener noreferrer">'+safe(p.label)+'</a> — Wikimedia Commons'+(p.attribution?' · '+safe(p.attribution):'')+'</li>').join('')+
        '</ul></details>':'')
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
