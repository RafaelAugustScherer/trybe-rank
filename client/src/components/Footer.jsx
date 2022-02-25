import { AiFillHeart } from 'react-icons/ai'

const Footer = () => (
  <div className="footer">
    <p>
      Feito com
      {<AiFillHeart/>}
      por:
      <a 
        href="https://github.com/Ply3r"
        target="_blank"
      >
        Leandro Henrique
      </a> e
      <a
        href="https://github.com/RafaelAugustScherer"
        target="_blank"
      >
        Rafael Scherer
      </a>
    </p>
  </div>
)

export default Footer;
