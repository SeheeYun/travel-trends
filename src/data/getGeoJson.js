import { feature } from 'topojson';
import topology from './skorea-provinces.json';

const KOREA_PROVINCE_OBJECT = 'skorea_provinces_2018_geo';
const geoJson = feature(topology, topology.objects[KOREA_PROVINCE_OBJECT]);

export default geoJson;
