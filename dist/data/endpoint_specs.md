## Specs for the data we need from the various endpoints.  Not proscriptive! Just want tot give the data team an idea of what the different pages need.

### Campaigns By Address
Used by the Browse My Ballot pages to return a list of campaigns, grouped by race, grouped by "race level".

See campaignsByAddress.json for sample data

## Campaign Search
Campaigns returned from the campaign search.  See campaignSearch.json

## Campaign Detail
Detailed information about a candidate, reached via Campaign Search results or Campaigns by Address results.

see campaignById.json

This page also needs to query the total money, grassroots percent and local percent for the other campaigns 
in the same race, but maybe that should be a separate http call.  `getSummaryByRace`

## Campaign Finances Sankey
Query the direct contributions and expenditures for a single campaign. Something like this?

Should sum up the contributions per contributor and expenditures per category

```json
{
  "name": "Joe Schmo",
  "campaign_id": 2,
  "contributions": [
    {"contributor_id": 1, "amount": 4567865},
    {"contributor_id": 1, "amount": 4567865},
    {"contributor_id": 1, "amount": 4567865},
    {"contributor_id": 1, "amount": 4567865}
  ],
  "expenditures": [
    {"expenditure_type_id": 1, "name": "Advertising", "amount": 34987},
    {"expenditure_type_id": 1, "name": "Polling", "amount": 34987},
    {"expenditure_type_id": 1, "name": "Staff", "amount": 34987},
    {"expenditure_type_id": 1, "name": "Meals", "amount": 34987}
  ]
}
```