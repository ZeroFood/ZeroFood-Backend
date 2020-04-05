import { Double } from "typeorm";


export enum GeoJSONType {
    Point = "Point",
    LineString = "LineString",
    Polygon = "Polygon",
    MultiPoint = "MultiPoint",
    MultiLineString = "MultiLineString",
    MultiPolygon = "MultiPolygon",
    GeometryCollection = "GeometryCollection"
}

export class Location {
    type: GeoJSONType = GeoJSONType.Point;
    coordinates: Double[];
    geometries: Location[];
}