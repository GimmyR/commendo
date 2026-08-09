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