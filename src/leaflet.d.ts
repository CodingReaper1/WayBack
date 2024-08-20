import "leaflet";

declare module "leaflet" {
  interface Map {
    routePolyline?: L.Polyline;
  }
}
