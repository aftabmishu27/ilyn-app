export const fetchLocationId = async city => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
  };
  
export const fetchWeather = async woeid => {
    const response = await fetch(
        `https://www.metaweather.com/api/location/${woeid}/`,
    );
    const { title, consolidated_weather } = await response.json();
    const { weather_state_name, the_temp } = consolidated_weather[0];

    return {
        location: title,
        weather: weather_state_name,
        temperature: the_temp,
    };
};

// using api no. 20: get user data
export const fetch_ChildsIdByUserId = async id =>{
    const response = await fetch(
        `http://128.199.225.144:8069/restapi/1.0/object/res.users/${id}?fields=['id','name','login','partner_id','child_ids']`,
    );
    const data = await response.json();

    return data["res.users"][0].child_ids;
}


// using api no: 22. get shipping address list
export const fetch_shipping_address_list_by_childs_id = async child_ids =>{
    const response = await fetch(
        `http://128.199.225.144:8069/restapi/1.0/object/res.partner?ids=${child_ids}&fields=['id','name','phone','street','street2','city','state_id','zip']`,
    );
    const data = await response.json();

    return data["res.partner"][0];
}


export const fetch_variant_product_quantity = async id => {
    const response = await fetch(
        `http://128.199.225.144:8069/restapi/1.0/object/product.product/${id}?fields=['id','qty_available']`,
    );
    const data = await response.json();
    return data["product.product"][0];
}