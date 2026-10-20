(() => {
  'use strict';
  const element = id => document.getElementById(id);
  const activities = window.TENERIFE_ACTIVITY_LIST;
  const locations = window.TENERIFE_ACTIVITY_LOCATIONS;
  const picker = element('mapActivityPicker');
  const card = element('mapActivityCard');
  const error = element('mapError');
  const markers = new Map();
  const islandBounds = [[27.97, -16.96], [28.62, -16.1]];
  let map = null;
  let selectedId = '';
  const safe = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

  for (const [id, emoji, name] of activities) {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = emoji + ' ' + name;
    picker.append(option);
  }

  function refresh() {
    for (const [id, entry] of markers) {
      const vote = window.getTenerifeVote(id);
      const signature = (vote?.[0] || '') + ':' + (id === selectedId);
      if (entry.signature === signature) continue;
      entry.signature = signature;
      entry.marker.setIcon(L.divIcon({
        className:'activity-marker', iconSize:[44,44], iconAnchor:[22,22],
        html:'<span class="map-pin' + (vote?' has-vote':'') + (id===selectedId?' is-selected':'') + '" aria-hidden="true">' + entry.activity[1] + (vote?'<span class="map-vote-badge">' + vote[1] + '</span>':'') + '</span>'
      }));
      const title = entry.activity[2] + (vote?' — jouw keuze: ' + vote[2]:' — nog geen keuze');
      entry.marker.setTooltipContent(safe(title));
      const markerElement = entry.marker.getElement();
      markerElement.setAttribute('aria-label', title);
      markerElement.setAttribute('aria-pressed', String(id === selectedId));
      markerElement.setAttribute('title', title);
      entry.marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    }
    if (!selectedId) return;
    window.mountTenerifeActivityCard(card, selectedId);
    const vote = window.getTenerifeVote(selectedId);
    element('mapSelectionStatus').textContent = vote?'Jouw keuze: ' + vote[1] + ' ' + vote[2]:'Nog geen keuze gemaakt. Wat lijkt jou leuk?';
  }

  function selectActivity(id) {
    const location = locations.find(location => location.id === id);
    if (!location) return;
    selectedId = id;
    picker.value = id;
    element('mapActivityLocation').textContent = '📍 ' + location.location;
    refresh();
  }

  function spreadMarkers() {
    const placed = [];
    const size = map.getSize();
    for (const entry of markers.values()) {
      const origin = map.latLngToContainerPoint(entry.coordinates);
      let point = origin;
      let attempt = 0;
      while (placed.some(other => point.distanceTo(other) < 52) && attempt < 40) {
        const angle = attempt * Math.PI / 4;
        const radius = 54 * (1 + Math.floor(attempt / 8));
        point = L.point(Math.max(27,Math.min(size.x-27,origin.x+Math.cos(angle)*radius)),Math.max(27,Math.min(size.y-27,origin.y+Math.sin(angle)*radius)));
        attempt++;
      }
      placed.push(point);
      const displayed = map.containerPointToLatLng(point);
      entry.marker.setLatLng(displayed);
      entry.leader.setLatLngs([entry.coordinates, displayed]);
    }
  }

  function resetView() {
    if (map) map.fitBounds(islandBounds, {padding:[24,24], maxZoom:10});
  }

  window.refreshTenerifeMap = refresh;
  window.showTenerifeMap = () => {
    if (!window.L) {
      error.textContent = 'De kaart kon niet laden. Je kunt hierboven wel een activiteit kiezen en stemmen.';
      error.hidden = false;
      return;
    }
    if (!map) {
      map = L.map('activityMap', {
        scrollWheelZoom:false, zoomSnap:0.25, maxZoom:13,
        maxBounds:[[27.6,-17.5],[29,-15.6]], maxBoundsViscosity:1
      });
      map.attributionControl.addAttribution('Eilandcontour: <a href="https://www.naturalearthdata.com/">Natural Earth</a>');
      fetch('tenerife-coastline.json').then(response => {
        if (!response.ok) throw new Error('Eilandcontour niet beschikbaar');
        return response.json();
      }).then(coastline => L.geoJSON(coastline, {
        interactive:false,
        style:{color:'#9bb9ab',weight:1.5,fillColor:'#f4f3e8',fillOpacity:1}
      }).addTo(map).bringToBack()).catch(() => {
        error.textContent = 'De eilandcontour kon niet laden. De activiteitspinnen en keuzelijst blijven bruikbaar.';
        error.hidden = false;
      });
      resetView();
      for (const location of locations) {
        const activity = activities.find(activity => activity[0] === location.id);
        const coordinates = [location.lat, location.lon];
        const leader = L.polyline([coordinates,coordinates], {interactive:false,color:'#087f77',weight:1.5,opacity:0.5,dashArray:'3 5'}).addTo(map);
        const marker = L.marker(coordinates, {
          icon:L.divIcon({className:'activity-marker',html:'',iconSize:[44,44],iconAnchor:[22,22]}),
          title:activity[2], keyboard:true, autoPanOnFocus:false
        }).addTo(map).bindTooltip(safe(activity[2]), {direction:'top',offset:[0,-24]});
        marker.on('keydown', event => {
          if (event.originalEvent.key === 'Enter' || event.originalEvent.key === ' ') {
            L.DomEvent.stop(event.originalEvent);
            marker.fire('click');
          }
        });
        marker.on('click', () => {
          selectActivity(location.id);
          card.querySelector('.details-button').focus({preventScroll:true});
          if (window.matchMedia('(max-width:760px)').matches) card.scrollIntoView({block:'nearest'});
        });
        markers.set(location.id,{marker,leader,coordinates,activity,signature:null});
      }
      map.on('zoomend resize', spreadMarkers);
    }
    map.invalidateSize();
    spreadMarkers();
    refresh();
  };
  picker.addEventListener('change', () => {
    if (picker.value) selectActivity(picker.value);
    else {
      selectedId = '';
      card.innerHTML = '';
      element('mapActivityLocation').textContent = '';
      element('mapSelectionStatus').textContent = 'Kies een icoontje op de kaart of een activiteit uit de lijst.';
      refresh();
    }
  });
  element('mapReset').addEventListener('click', resetView);
})();
