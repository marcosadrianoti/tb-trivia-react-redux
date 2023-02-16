export const addToRanking = (player, local) => {
  const ranking = JSON.parse(local);
  const newRanking = [...ranking, player];
  localStorage.setItem('Ranking', JSON.stringify(newRanking));
};

export const addScore = (difficulty, time, score, assertions) => {
  const basePontuation = 10;
  const hardPontuation = 3;
  const mediumPontuation = 2;
  const easyPontuation = 1;
  let difficultValue = 0;
  if (difficulty === 'hard') {
    difficultValue = hardPontuation;
  }
  if (difficulty === 'medium') {
    difficultValue = mediumPontuation;
  }
  if (difficulty === 'easy') {
    difficultValue = easyPontuation;
  }
  const totalAssertions = assertions + 1;
  const scoreToAdd = basePontuation + (time * difficultValue);
  const newScore = score + scoreToAdd;

  return { totalAssertions, newScore };
};
