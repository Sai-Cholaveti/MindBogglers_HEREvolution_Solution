document.addEventListener('DOMContentLoaded', function () {
    const tours = [
        { name: 'City Center Tour', description: 'Explore the bustling city center.', location: { lat: 52.520008, lng: 13.404954 }, image: 'city_center.jpg' },
        { name: 'Historical District Tour', description: 'Discover the rich history of the city.', location: { lat: 52.516667, lng: 13.383333 }, image: 'historical_district.jpg' },
        // Add more tour data as needed
    ];

    const tourList = document.getElementById('tour-list');
    tours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.classList.add('tour-card');
        tourCard.innerHTML = `
            <img src="https://c8.alamy.com/comp/2DF7HG0/france-indre-et-loire-loire-valley-on-the-world-heritage-list-of-unesco-tours-city-center-2DF7HG0.jpg" class="tour-img">
            <div class="tour-content">
                <h3>${tour.name}</h3>
                <p>${tour.description}</p>
            </div>
        `;
        tourList.appendChild(tourCard);
    });

    const historyContent = document.getElementById('history-content');
    historyContent.innerHTML = `
        <p>You can find Historical information of the city</p>
    `;

    const platform = new H.service.Platform({
        apikey: 'ASVv8c6-SBDzGquMbbmD_cD6Be6pmbWNRIuFU2CXGEo'
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
        document.getElementById('map-container'),
        defaultLayers.vector.normal.map,
        {
            center: { lat: 52.520008, lng: 13.404954 },
            zoom: 12,
            pixelRatio: window.devicePixelRatio || 1
        }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());

    tours.forEach(tour => {
        const marker = new H.map.Marker(tour.location);
        map.addObject(marker);
    });
});
