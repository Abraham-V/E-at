import { Component } from '@angular/core';

import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    _cookieService: any;
    @ViewChild('gmap') gmapElement: any;
    @ViewChild('map') mapElement: any;
    @ViewChild('ginput') ginput: any; 
    @ViewChild('test') test: any;
    
    map: google.maps.Map;

    public places: any = [
        { Location: "Kalamaria", Place: "A", Food: "A1", Price: 3.0, Time: 0, Quantity: 0 },
        { Location: "Kalamaria", Place: "A", Food: "A2", Price: 2.5, Time: 0, Quantity: 0 },
        { Location: "Kalamaria", Place: "A", Food: "A3", Price: 2.5, Time: 0, Quantity: 0 },
        { Location: "Kalamaria", Place: "A", Food: "A4", Price: 2.0, Time: 0, Quantity: 0 },
        { Location: "Kalamaria", Place: "A", Food: "A5", Price: 6.0, Time: 0, Quantity: 0 },
        { Location: "Ano Poli", Place: "B", Food: "B1", Price: 4.0, Time: 0, Quantity: 0 },
        { Location: "Ano Poli", Place: "B", Food: "B2", Price: 5.0, Time: 0, Quantity: 0 },
        { Location: "Ano Poli", Place: "B", Food: "B3", Price: 8.0, Time: 0, Quantity: 0 },
        { Location: "Ano Poli", Place: "B", Food: "B4", Price: 1.5, Time: 0, Quantity: 0 },
        { Location: "Plateia Aristotelous", Place: "C", Food: "C1", Price: 3.0, Time: 0, Quantity: 0 },
        { Location: "Plateia Aristotelous", Place: "C", Food: "C2", Price: 4.0, Time: 0, Quantity: 0 },
        { Location: "Plateia Aristotelous", Place: "C", Food: "C3", Price: 5.5, Time: 0, Quantity: 0 },
        { Location: "Plateia Aristotelous", Place: "C", Food: "C4", Price: 6.0, Time: 0, Quantity: 0 },
        { Location: "Plateia Aristotelous", Place: "C", Food: "C5", Price: 3.0, Time: 0, Quantity: 0 },
        { Location: "Ladadika", Place: "D", Food: "D1", Price: 9.0, Time: 0, Quantity: 0 },
        { Location: "Ladadika", Place: "D", Food: "D2", Price: 6.5, Time: 0, Quantity: 0 },
        { Location: "Ladadika", Place: "D", Food: "D3", Price: 7.0, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E1", Price: 1.5, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E2", Price: 3.0, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E3", Price: 1.2, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E4", Price: 0.5, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E5", Price: 4.0, Time: 0, Quantity: 0 },
        { Location: "Triandria", Place: "E", Food: "E6", Price: 4.5, Time: 0, Quantity: 0 }
    ];
    
    ngOnInit() {
        var mapProp = {
            center: new google.maps.LatLng(40.636433, 22.945203),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            fitBounds: google.maps.LatLngBounds,
            latLng: google.maps.LatLng
        };


        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        var searchBox = new google.maps.places.SearchBox(this.ginput.nativeElement);
        //mapProp.controls[google.maps.ControlPosition.TOP_LEFT].push(this.ginput.nativeElement);

        // Bias the SearchBox results towards current map's viewport.
        //map.addListener('bounds_changed', function () {
        //    searchBox.setBounds(map.getBounds());
        //});



        var markers: any = [];

        var that = this;
        
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            for (var i = 0; i < 23; i++) {
                that.getDistance(i);
            }

            markers.forEach(function (marker: any) {
                marker.setMap(null);
            });
            markers = [];

            var test = "";

            var bounds: any = new google.maps.LatLngBounds();
            places.forEach(function (place: any) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                test = place;

                // Create a marker for each place.
                //markers.push(new google.maps.Marker,{
                //    map: mapProp,
                //    icon: icon,
                //    title: place.name,
                //    position: place.geometry.location
                //});

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            new mapProp.fitBounds(bounds);
        });
    }

    public getDistance(index: any) {
        var that = this;
        //Find the distance
        var distanceService = new google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix({
            origins: [this.places[index].Location],
            destinations: [this.ginput.nativeElement.value],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        },
            function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    console.log('Error:', status);
                } else {

                    var TotalTime = response.rows[0].elements[0].duration.value + 15 * 60 ;

                    if (TotalTime < 40 * 60) {

                        var minutes = Math.round((TotalTime % 3600) / 60);

                        that.places[index].Time = minutes + " minutes";

                    } else {

                        that.places[index].Time = -1;
                    }
                }
            });
    }    

    public savePlaces() {
        let key = 'Item 1';
        localStorage.setItem(key, this.ginput.nativeElement.value);
        let key2 = 'Item 2';
        localStorage.setItem(key2, JSON.stringify(this.places));
    }

}


