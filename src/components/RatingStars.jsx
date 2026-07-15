function RatingStars({ rating }) {
  const fullStars = Math.round(rating / 2);

  return (
    <div>
      {[0, 1, 2, 3, 4].map((index) => {
        return (
          <i
            key={index}
            className={
              index < fullStars
                ? `bi bi-star-fill text-warning`
                : `bi bi-star text-warning`
            }
          ></i>
        );
      })}
    </div>
  );
}

export default RatingStars;
