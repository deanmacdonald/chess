for file in *.png; do
  color=${file:0:1}
  piece=${file:1:1}

  # Convert color to full name
  if [[ $color == "w" ]]; then
    color_full="white"
  elif [[ $color == "b" ]]; then
    color_full="black"
  else
    continue
  fi

  # Convert piece to full name
  case $piece in
    p) piece_full="pawn" ;;
    r) piece_full="rook" ;;
    n) piece_full="knight" ;;
    b) piece_full="bishop" ;;
    q) piece_full="queen" ;;
    k) piece_full="king" ;;
    *) continue ;;
  esac

  # Rename the file
  mv "$file" "${piece_full}_${color_full}.png"
done
