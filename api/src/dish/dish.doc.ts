export const langDoc = { 
    name: 'lang', 
    required: true, 
    type: String, 
    example: 'fr' 
};

export const pageDoc = { 
    name: 'page', 
    required: false, 
    type: Number, 
    example: 1 
};

export const limitDoc = { 
    name: 'limit', 
    required: false, 
    type: Number, 
    example: 10 
};

export const filterDoc = {
    name: 'filter',
    required: false,
    type: String,
    description:
        `Filter by name (contains) or price (equals, gt, gte, lt, lte).<br/>
        Operator should start and end with ":".<br/>
        You can do many conditions by separating them with ";".`,
    example: 'name:contains:maza;price:gte:10000',
}