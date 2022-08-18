/**
 * Gets the factors of a matrix
 *
 * @param {Array} TARGET_MATRIX target matrix
 * @param {Number} LATENT_FEATURES_COUNT Number of latent features
 * @param {Number} ITERS Number of times to move towards the real factors
 * @param {Number} LEARNING_RATE Learning rate
 * @param {Number} REGULARIZATION_RATE Regularization amount, i.e. amount of bias reduction
 * @returns {Array} An array containing the two factor matrices
 */
function factorizeMatrix(
  TARGET_MATRIX,
  LATENT_FEATURES_COUNT = 5,
  ITERS = 5000,
  LEARNING_RATE = 0.0002,
  REGULARIZATION_RATE = 0.02,
  THRESHOLD = 0.001
) {
  const FACTOR1_ROW_COUNT = TARGET_MATRIX.length;
  const FACTOR2_ROW_COUNT = TARGET_MATRIX[0].length;
  const factorMatrix1 = fillMatrix(
    FACTOR1_ROW_COUNT,
    LATENT_FEATURES_COUNT,
    () => Math.random()
  );
  const factorMatrix2 = fillMatrix(
    FACTOR2_ROW_COUNT,
    LATENT_FEATURES_COUNT,
    () => Math.random()
  );
  const transposedFactorMatrix2 = transpose(factorMatrix2);
  const ROW_COUNT = TARGET_MATRIX.length;
  const COLUMN_COUNT = TARGET_MATRIX[0].length;
  const updateLatentFeature = (latentFeatureA, latentFeatureB, error) =>
    latentFeatureA +
    LEARNING_RATE *
      (2 * error * latentFeatureB - REGULARIZATION_RATE * latentFeatureA);

  doFor(ITERS, () => {
    // Iteratively figure out correct factors
    doFor(ROW_COUNT, (i) => {
      doFor(COLUMN_COUNT, (j) => {
        // Get actual value on target matrix
        const TRUE_VALUE = TARGET_MATRIX[i][j];

        // Process non-empty values
        if (TRUE_VALUE > 0) {
          // Get difference of actual value and the current approximate value as error
          const CURRENT_VALUE = dot(
            factorMatrix1[i],
            columnVector(transposedFactorMatrix2, j)
          );
          const ERROR = TRUE_VALUE - CURRENT_VALUE;

          // Update factor matrices
          doFor(LATENT_FEATURES_COUNT, (k) => {
            const latentFeatureA = factorMatrix1[i][k];
            const latentFeatureB = transposedFactorMatrix2[k][j];

            // Update latent feature k of factor matrix 1
            factorMatrix1[i][k] = updateLatentFeature(
              latentFeatureA,
              latentFeatureB,
              ERROR
            );

            // Update latent feature k of factor matrix 2
            transposedFactorMatrix2[k][j] = updateLatentFeature(
              latentFeatureB,
              latentFeatureA,
              ERROR
            );
          });
        }
      });
    });

    // Calculating totalError
    const TOTAL_ERROR = calculateError(
      ROW_COUNT,
      COLUMN_COUNT,
      TARGET_MATRIX,
      LATENT_FEATURES_COUNT,
      REGULARIZATION_RATE,
      factorMatrix1,
      transposedFactorMatrix2
    );

    // Complete factorization process if total error falls below a certain threshold
    if (TOTAL_ERROR < THRESHOLD) return;
  });

  return [factorMatrix1, transpose(transposedFactorMatrix2)];
}

/**
 * Calculate total error of factor matrices
 *
 * @param {Number} ROW_COUNT
 * @param {Number} COLUMN_COUNT
 * @param {Array} TARGET_MATRIX
 * @param {Number} LATENT_FEATURES_COUNT
 * @param {Number} REGULARIZATION_RATE
 * @param {Array} factorMatrix1
 * @param {Array} transposedFactorMatrix2
 * @returns {Number}
 * @private
 */
function calculateError(
  ROW_COUNT,
  COLUMN_COUNT,
  TARGET_MATRIX,
  LATENT_FEATURES_COUNT,
  REGULARIZATION_RATE,
  factorMatrix1,
  transposedFactorMatrix2
) {
  let totalError = 0;

  doFor(ROW_COUNT, (i) => {
    doFor(COLUMN_COUNT, (j) => {
      // Get actual value on target matrix
      const TRUE_VALUE = TARGET_MATRIX[i][j];

      // Process non-empty values
      if (TRUE_VALUE > 0) {
        // Get difference of actual value and the current approximate value as error
        const CURRENT_VALUE = dot(
          factorMatrix1[i],
          columnVector(transposedFactorMatrix2, j)
        );
        const ERROR = TRUE_VALUE - CURRENT_VALUE;

        // Increment totalError with current error
        totalError = totalError + square(ERROR);

        doFor(LATENT_FEATURES_COUNT, (k) => {
          totalError =
            totalError +
            (REGULARIZATION_RATE / 2) *
              (square(factorMatrix1[i][k]) +
                square(transposedFactorMatrix2[k][j]));
        });
      }
    });
  });

  return totalError;
}

/**
 * Build completed matrix from matrix factors.
 *
 * @param {Array} factors Derived matrix factors
 * @returns {Array} Completed matrix
 */
function buildCompletedMatrix(factors) {
  const [FACTOR1, FACTOR2] = factors;

  return dot(FACTOR1, transpose(FACTOR2));
}

/***************************
 * Helper Functions        *
 ***************************/

/**
 * Transposes a matrix
 *
 * @param {Array} matrix Target matrix
 * @returns {Array} The transposed matrix
 * @private
 */
function transpose(matrix) {
  if (isMatrix(matrix)) {
    const TRANSPOSED_ROW_COUNT = matrix[0].length;
    const TRANSPOSED_COLUMN_COUNT = matrix.length;
    const transposed = fillMatrix(
      TRANSPOSED_ROW_COUNT,
      TRANSPOSED_COLUMN_COUNT,
      () => 0
    );

    return transposed.map((t, i) => t.map((u, j) => matrix[j][i]));
  } else {
    return matrix;
  }
}

/**
 * Checks if value passed is a matrix.
 *
 * @param {Array} m Value to check
 * @returns {boolean} True if matrix, false if not
 * @private
 */
function isMatrix(m) {
  return Array.isArray(m[0]);
}

/**
 * Gets the dot product of two matrices.
 *
 * @param {Array} m First matrix
 * @param {Array} n Second matrix
 * @returns {Array} Dot product of the two matrices
 * @private
 */
function dot(m, n) {
  const transposedN = transpose(n);

  if (!isMatrix(m) && !isMatrix(n)) {
    return dotVectors(m, n);
  }

  return m.map((row) => transposedN.map((column) => dotVectors(row, column)));
}

/**
 * Gets the column vector at given index.
 *
 * @param {Array} matrix
 * @param {Number} index
 * @returns {Array}
 * @private
 */
function columnVector(matrix, index) {
  return matrix.map((m) => m[index]);
}

/**
 * Multiplies vectors together and sums the resulting vector up.
 *
 * @param {Array} v
 * @param {Array} w
 * @returns {Number}
 * @private
 */
function dotVectors(v, w) {
  return bimap(v, w, (x, y) => x * y).reduce((sum, x) => sum + x);
}

/**
 * Reduces two lists into one using the given function.
 *
 * @param {Array} a1
 * @param {Array} a2
 * @param {Function} fn A function that accepts two values and returns a single value
 * @returns A list which is a combination of the two lists
 * @private
 */
function bimap(a1, a2, fn) {
  return a1.map((item, i) => fn(item, a2[i]));
}

/**
 * Squares a number
 *
 * @param {Number} x
 * @returns {Number}
 * @private
 */
function square(x) {
  return Math.pow(x, 2);
}

/**
 * Creates an n x m matrix filled with the result of given fill function
 *
 * @param {Array} n Number of rows
 * @param {Array} m Number of columns
 * @param {Function} fill Function used to fill the matrix with
 * @returns {Array} The filled matrix
 * @private
 */
function fillMatrix(n, m, fill = () => 0) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < m; j++) {
      matrix[i][j] = fill();
    }
  }

  return matrix;
}

/**
 * Execute given function n times.
 *
 * @param {Number} n Number of times to execute function
 * @param {Function} fn Function to execute
 * @private
 */
function doFor(n, fn) {
  let i = 0;
  while (i < n) fn(i++);
}

// Functions to export
const toExport = {
  factorizeMatrix,
  buildCompletedMatrix,
};

// If in Node, export as module
if (typeof module !== "undefined" && module.exports) {
  module.exports = toExport;
} else {
  // If in browser, export to a `matrixFactorization` global variable
  window.matrixFactorization = toExport;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const originalMatrix = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    2, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0,
    1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
    1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
];

console.log({ originalMatrix });

const LATENT_FEATURE_COUNT_2 = 10;
// const matrix = buildCompletedMatrix(
//   factorizeMatrix(originalMatrix, LATENT_FEATURE_COUNT_2)
// );

let data = [
  1.732262485669881, 0.8974064412807136, 0.7768175824621891, 1.0838759582743513,
  0.9996911275471271, 1.0012573316989979, 0.9775970465267211,
  1.4303685917626001, 1.2581200748526875, 1.1715018703283078,
  1.4902927619061357, 0.7964220352424236, 0.9821477371000247,
  0.6686287071378572, 0.9379118357625724, 1.1405853381645983,
  0.7361451678988101, 0.943595345910474, 0.5682882099321895, 0.937514660844145,
  0.9697613299185954, 1.0980415852521528, 1.0700864554295473,
  1.0312654018770997, 0.9810900286047465, 1.1778740334150613,
  1.0216188919388876, 0.9737425266392861, 1.5439042318146428, 1.298633313053905,
  1.3415623351826977, 1.3715416986107318, 0.9952477735612092, 1.229622737443673,
  0.8124032875503823, 0.999295603268791, 0.9688654465345358, 0.7143558047193534,
  1.2868807738314447, 0.9479305481770213, 1.0105109685889337,
  0.7461019654908759, 1.1463573621420182, 1.198409966530148, 1.0171751236210458,
  0.814839423914477, 0.47308388615809643, 0.5523003721725883,
  1.0104562976936755, 0.8094868059841825, 1.1232023646273297,
  0.8789237999438031, 1.1896330971623854, 0.783374198040346, 0.9024333937873361,
  1.4017603284337103, 1.0750736354951873, 1.3850422235638857, 1.381745319857689,
  0.9016044459414659, 0.9288911609179258, 0.7422108572541303,
  1.0502683270913522, 0.9855586491250199, 0.9907449410885173, 0.858282075511863,
  1.0283219225633122, 1.1515914707565182, 0.9474513499890581,
  0.8291499966351075, 1.1865947587140058, 1.0711252854239535,
  1.3670816892174358, 0.9751375765615012, 1.3870937099221143,
  0.8924714682511644, 0.7021338022528668, 0.7447040898416266,
  1.1175303070813043, 1.0817549980508343, 0.9936612100740814,
  0.6964403332318954, 1.179820045934642, 0.8836051475951672, 1.025931442364969,
  0.8894452155167616, 0.9909733018435081, 1.061605406772725, 1.019276549210181,
  1.016718745915688, 1.0161921413243953, 1.1055064248683477, 0.7813581253781886,
  1.0028110896424458, 1.195341195066657, 0.9222490502628897, 1.0945817107696718,
  1.4423966847310925, 0.9487120516534961, 0.8382601332477944, 1.051381095824826,
  1.0607191253202977, 0.9833034971590153, 1.3750883629114217, 1.224380843256914,
  1.2378154380049777, 1.0793414142329867, 0.993462477252408, 0.8546279608656518,
  0.6159924885415394, 1.7756797070782504, 1.0588689748574973,
  1.0135699876803546, 1.013621414060746, 1.2559502693926947, 0.9621127182438766,
  1.2146217797787489, 1.2843637251037594, 1.1266902472537637,
  0.9893461667667871, 0.8933128610463366, 0.8798017524787217, 1.052987723031787,
  1.0984151896975385, 1.4907980006870878, 1.1068842288709009,
  0.8004960427660142, 0.5142949005455549, 1.0217444527082062,
  1.0244119042212854, 0.9227802452567009, 0.8173358697607973,
  0.9753671582453397, 0.8755662696976075, 0.7260948998980739, 1.17266679512787,
  1.0271208777337644, 0.9545362679409597, 0.9614471727183345,
  1.4837449156481162, 1.3260091269738716, 1.1956231040404182, 1.221689838127394,
  1.2037483457614448, 1.0019361185349829, 0.6223138785670579, 0.939364193842066,
  0.45681817386049295, 1.2123798701058848, 1.0772650180902343,
  1.3058751537300086, 1.0674019328508038, 0.6280730120114373,
  0.7238547430121176, 0.9845336040835707, 0.9980405007983251,
  0.8004330954467961, 0.974696774744116, 1.033819670661988, 1.169540791734354,
  0.7444864296462514, 1.1671065481606167, 0.9753020890868701, 1.164006632713518,
  0.9118729346668039, 1.008157907068991, 0.7612581625517648, 0.9237660122997973,
  1.1414136978282827, 0.9974756285759987, 0.8780995491110163,
  0.8914053894175846, 1.206563467415052, 0.6633632116703249, 1.3736731125279182,
  0.8180713279404207, 0.956063302410251, 1.101873041807211, 1.2693407700212787,
  0.7043424509710503, 0.9543670002052537, 0.7336117377469938,
  1.2461868075780265, 0.7461182940723219, 0.9584278050927428,
  1.0758915983893915, 0.6470347665477412, 1.2672319632814015, 0.879964360761142,
  0.8493942648679526, 0.6010078432767285, 1.041588563814772, 1.130463872017785,
  1.2386676353763637, 1.0488173110728933, 1.0950752537873427,
  0.8200924610093488, 0.9220340598144753, 1.0465223484734965,
  1.3798347303207177, 1.0192437309758975, 0.9539216691802122,
  1.3890051615713315, 0.9006142126551558, 0.9782807657712744, 0.766082309338322,
  1.252956421011074, 1.0167075699790764, 1.0296412728872526, 0.9339534005415937,
  1.2708219543684622, 0.7860806597708094, 1.0992414119679519,
  1.2838297322050614, 1.3558500552584167, 1.1121002524488117,
  1.0909701318622174, 0.9355625768723973, 1.0582429782497518,
  1.3966909579111475, 1.185818504908182, 1.265559717324431, 1.0466226018973734,
  0.9705533335438569, 0.9666893877210773, 0.9346859448325383,
  0.9823687366721068, 1.0424901419635262, 1.111194799460994, 1.033778805364465,
  1.077420533019957, 0.867313640697484, 0.9804443852386802, 1.3376523078187437,
  1.0385509633242207, 1.0218072492523342, 1.3346888949530782,
  0.8959345493128058, 1.0923675763879952, 0.9837162990804221,
  1.1969126029359856, 1.247366966598317, 0.9540146942849115, 0.9897701756499834,
  1.1464844489231818, 1.1341999724930814, 1.158797102150167, 1.0469352327300407,
  0.9345420305246622, 1.310527827224905, 1.0734289029176434, 0.9150504552479192,
  1.353401261884409, 1.212404142344952, 1.0669546679259818, 0.9599653780812123,
  0.6129646922361165, 1.0145631504059867, 0.5786284512925918,
  0.9987092784461734, 0.9604488133547265, 0.9359282017957192,
  0.9912837221372528, 1.1452370554476277, 1.1133653440631162,
  1.4013842767453546, 1.2532167403256158, 0.6539766142920772, 1.015802592271637,
  0.9515019253379204, 1.2060337170587847, 1.2716894760060158,
  0.7576043971357622, 1.2595554886148033, 1.3025804428377643,
  0.8732241261262662, 1.0303771252065594, 1.0446944882984588,
  0.9419513977097644, 0.9802495403542206, 1.0959189272370262,
  0.9146810074442006, 1.0690841574086012, 1.461387149074059, 0.9463126327730047,
  0.9810864296533081, 1.0317380252024613, 0.969385315509315, 1.0161967066180428,
  1.008288970218572, 1.3534446015496957, 0.8812634683409225, 0.5612385552167226,
  0.7861470817273729, 1.0087821500459684, 1.1203759814908207, 1.442172567967651,
];

const recommendation = data.filter((_, index) => !originalMatrix[1][index]);
recommendation.sort((a, b) => b - a);

console.log({ recommendation });
