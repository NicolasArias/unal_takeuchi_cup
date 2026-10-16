const seasonModules = import.meta.glob('./seasons/*.json', {
  eager: true,
  import: 'default'
});

export const mockStandingsData = Object.fromEntries(
  Object.entries(seasonModules).map(([seasonPath, seasonData]) => {
    const seasonFileName = seasonPath.split('/').pop().replace(/\.json$/, '');
    return [seasonFileName.replace(/_/g, ' '), seasonData];
  })
);
