// Interactive World Map Component

class WorldMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.map = null;
    this.currentMarker = null;
    this.onLocationSelect = null;
  }

  /**
   * Initialize the map
   */
  initialize(onLocationSelect) {
    this.onLocationSelect = onLocationSelect;
    
    // Create map centered on Europe/Asia
    this.map = L.map(this.container, {
      center: [30, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      zoomControl: true
    });

    // Add tile layer with beautiful map style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    // Add click event listener to map
    this.map.on('click', (e) => {
      // Normalize coordinates to ensure they're within valid ranges
      // Longitude: -180 to 180, Latitude: -90 to 90
      let { lat, lng } = e.latlng;
      
      // Wrap longitude to -180 to 180 range
      lng = ((lng + 180) % 360 + 360) % 360 - 180;
      
      // Clamp latitude to -90 to 90 range
      lat = Math.max(-90, Math.min(90, lat));
      
      this.selectLocation(lat, lng);
    });

    // Add custom control for instructions
    this.addInstructionsControl();
  }

  /**
   * Add instructions control to map
   */
  addInstructionsControl() {
    const InstructionsControl = L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: function(map) {
        const container = L.DomUtil.create('div', 'map-instructions');
        container.innerHTML = `
          <div style="background: rgba(255, 255, 255, 0.95); 
                      padding: 0.75rem 1rem; 
                      border-radius: 8px; 
                      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                      font-size: 0.875rem;
                      color: #333;
                      font-weight: 500;">
            📍 Click anywhere on the map to view weather
          </div>
        `;
        return container;
      }
    });

    this.map.addControl(new InstructionsControl());
  }

  /**
   * Select a location on the map
   */
  selectLocation(lat, lng, emitEvent = true) {
    // Remove existing marker if any
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    // Create custom icon for the location marker
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            transform: rotate(45deg);
            font-size: 16px;
          ">📍</div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    // Add new marker
    this.currentMarker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);

    // Add a pulse animation around the marker
    const pulseCircle = L.circle([lat, lng], {
      radius: 100000,
      color: '#667eea',
      fillColor: '#667eea',
      fillOpacity: 0.2,
      weight: 2,
      className: 'pulse-circle'
    }).addTo(this.map);

    // Remove pulse after animation
    setTimeout(() => {
      this.map.removeLayer(pulseCircle);
    }, 2000);

    // Pan to location with smooth animation
    this.map.setView([lat, lng], Math.max(this.map.getZoom(), 5), {
      animate: true,
      duration: 1
    });

    // Call the callback with coordinates
    if (this.onLocationSelect && emitEvent) {
      this.onLocationSelect(lat, lng);
    }
  }

  /**
   * Update marker position (when location changes from search)
   */
  updateMarker(lat, lng) {
    this.selectLocation(lat, lng, false);
  }

  /**
   * Destroy the map
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
