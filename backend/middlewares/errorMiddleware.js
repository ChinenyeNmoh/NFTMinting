// Function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


const validateId = async (req, res, next) => {
  const { id } = req.params;
  try{
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'Invalid ObjectId',
    });
  }

  console.log("Object id is valid")
  next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error.message);
  };


export { validateId, notFound };