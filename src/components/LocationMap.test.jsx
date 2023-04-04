import { mount } from "enzyme";
import LocationMap from "./LocationMap";

describe("LocationMap component", () => {
    const data = [51.505, -0.09];
    const locationName = "London";

    it("renders a map with a marker and tooltip", () => {
        const wrapper = mount(<LocationMap data={data} locationName={locationName} />);

        // Assert that the map container and leaflet tile layer exist
        expect(wrapper.find(".map-container")).toHaveLength(1);
        expect(wrapper.find("TileLayer")).toHaveLength(1);

        // Assert that the marker and tooltip exist and have the correct props
        const marker = wrapper.find("Marker");
        expect(marker).toHaveLength(1);
        expect(marker.prop("position")).toEqual(data);

        const tooltip = marker.find("Tooltip");
        expect(tooltip).toHaveLength(1);
        expect(tooltip.prop("direction")).toEqual("left");
        expect(tooltip.prop("offset")).toEqual([-20, 0]);
        expect(tooltip.prop("opacity")).toEqual(50);
        expect(tooltip.text()).toEqual(locationName);
    });
});
