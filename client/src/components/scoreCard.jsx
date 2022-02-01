const ScoreCard = ({ hits, score, streak }) => (
  <div className="score-card-container">
    <div>
      <h4>{ hits }</h4>
      <h6>{ +hits > 1 ? "Acertos" : "Acerto"}</h6>
    </div>
    <div>
      <h4>{ score }</h4>
      <h6>Pontos</h6>
    </div>
    <div>
      <h4>{ streak }</h4>
      <h6>Maior sequencia</h6>
    </div>
  </div>
);

export default ScoreCard;
