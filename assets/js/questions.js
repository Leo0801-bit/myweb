/* 线代 · 研学室 — 习题库
   type: single / judge / fill
   single: answer 为正确选项下标；judge: 0=正确，1=错误；fill: answers 为可接受答案。 */
(function () {
  const r = String.raw;

  window.LA_QUESTIONS = [
    /* ================= 行列式 ================= */
    {
      id: 'q-det-1',
      chapterId: 'determinants',
      difficulty: 'basic',
      type: 'single',
      stem: r`计算二阶行列式 \(\begin{vmatrix}3&2\\1&4\end{vmatrix}\) 的值。`,
      options: [r`\(10\)`, r`\(14\)`, r`\(8\)`, r`\(5\)`],
      answer: 0,
      explanation: r`二阶行列式等于主对角线之积减去副对角线之积：\(3\times4-2\times1=12-2=10\)。`
    },
    {
      id: 'q-det-2',
      chapterId: 'determinants',
      difficulty: 'basic',
      type: 'single',
      stem: r`设 \(A\) 为三阶矩阵，且 \(\det A=2\)，则 \(\det(3A)=\)（　）。`,
      options: [r`\(6\)`, r`\(18\)`, r`\(54\)`, r`\(2\)`],
      answer: 2,
      explanation: r`三阶矩阵的每个元素都乘以 3，相当于三行各提出一个 3，因此 \(\det(3A)=3^3\det A=27\times2=54\)。`
    },
    {
      id: 'q-det-3',
      chapterId: 'determinants',
      difficulty: 'basic',
      type: 'judge',
      stem: r`若 \(\det A=0\)，则矩阵 \(A\) 一定含有零行。`,
      answer: 1,
      explanation: r`错误。行列式为零说明行（列）向量线性相关，但不一定有零行。例如 \(\begin{pmatrix}1&2\\2&4\end{pmatrix}\) 的两行成比例，行列式为零，却没有零行。`
    },
    {
      id: 'q-det-4',
      chapterId: 'determinants',
      difficulty: 'basic',
      type: 'single',
      stem: r`上三角矩阵 \(\begin{pmatrix}2&5&-1\\0&-1&3\\0&0&3\end{pmatrix}\) 的行列式为（　）。`,
      options: [r`\(-6\)`, r`\(6\)`, r`\(5\)`, r`\(0\)`],
      answer: 0,
      explanation: r`上三角行列式等于主对角线元素之积：\(2\times(-1)\times3=-6\)。`
    },
    {
      id: 'q-det-5',
      chapterId: 'determinants',
      difficulty: 'basic',
      type: 'fill',
      stem: r`计算 \(\begin{vmatrix}1&2\\2&5\end{vmatrix}\) 的值。`,
      answers: ['1', '+1'],
      format: '填写一个整数',
      explanation: r`\(1\times5-2\times2=5-4=1\)。`
    },
    {
      id: 'q-det-6',
      chapterId: 'determinants',
      difficulty: 'advanced',
      type: 'single',
      stem: r`范德蒙德行列式 \(\begin{vmatrix}1&1&1\\1&2&4\\1&4&16\end{vmatrix}=\)（　）。`,
      options: [r`\(6\)`, r`\(8\)`, r`\(12\)`, r`\(24\)`],
      answer: 0,
      explanation: r`三列分别对应 \(x=1,2,4\) 的零次、一次、二次幂，所以行列式为 \((2-1)(4-1)(4-2)=1\times3\times2=6\)。`
    },
    {
      id: 'q-det-7',
      chapterId: 'determinants',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`对同阶方阵 \(A,B\)，一般有 \(\det(A+B)=\det A+\det B\)。`,
      answer: 1,
      explanation: r`错误。行列式对“单独一行”具有可加性，不是对整个矩阵可加。例如 \(A=B=I_2\) 时，\(\det(A+B)=4\)，而 \(\det A+\det B=2\)。`
    },
    {
      id: 'q-det-8',
      chapterId: 'determinants',
      difficulty: 'advanced',
      type: 'single',
      stem: r`设 \(A\) 为 \(n\) 阶方阵，线性方程组 \(A\mathbf{x}=\mathbf{b}\) 的系数行列式 \(\det A=0\)，则（　）。`,
      options: [
        r`一定有唯一解`,
        r`一定有无穷多解`,
        r`若有解，则必有无穷多解；也可能无解`,
        r`一定无解`
      ],
      answer: 2,
      explanation: r`\(\det A=0\) 说明 \(A\) 不可逆，因此不可能有唯一解。若增广矩阵与 \(A\) 秩相等，则有解且自由变量至少一个，故有无穷多解；若秩不相等，则无解。`
    },

    /* ================= 矩阵 ================= */
    {
      id: 'q-mat-1',
      chapterId: 'matrices',
      difficulty: 'basic',
      type: 'single',
      stem: r`设 \(A\) 为 \(2\times3\) 矩阵，\(B\) 为 \(3\times4\) 矩阵，则 \(AB\) 是（　）。`,
      options: [r`\(2\times4\) 矩阵`, r`\(3\times3\) 矩阵`, r`\(4\times2\) 矩阵`, r`无法相乘`],
      answer: 0,
      explanation: r`\(A\) 的行数为 2、\(B\) 的列数为 4，中间维数 3 匹配，所以 \(AB\) 为 \(2\times4\) 矩阵。`
    },
    {
      id: 'q-mat-2',
      chapterId: 'matrices',
      difficulty: 'basic',
      type: 'single',
      stem: r`计算 \(\begin{pmatrix}1&0\\0&2\end{pmatrix}\begin{pmatrix}3&4\\5&6\end{pmatrix}\)。`,
      options: [
        r`\(\begin{pmatrix}3&4\\10&12\end{pmatrix}\)`,
        r`\(\begin{pmatrix}3&4\\5&12\end{pmatrix}\)`,
        r`\(\begin{pmatrix}3&6\\5&8\end{pmatrix}\)`,
        r`\(\begin{pmatrix}3&0\\0&12\end{pmatrix}\)`
      ],
      answer: 0,
      explanation: r`对角矩阵左乘相当于给各行乘上相应系数：第一行乘 1，第二行乘 2，得到 \(\begin{pmatrix}3&4\\10&12\end{pmatrix}\)。`
    },
    {
      id: 'q-mat-3',
      chapterId: 'matrices',
      difficulty: 'basic',
      type: 'judge',
      stem: r`对任意同阶方阵 \(A,B\)，都有 \(AB=BA\)。`,
      answer: 1,
      explanation: r`错误。矩阵乘法一般不满足交换律。例如 \(\begin{pmatrix}1&1\\0&1\end{pmatrix}\) 与 \(\begin{pmatrix}1&0\\1&1\end{pmatrix}\) 的乘积顺序不同，结果也不同。`
    },
    {
      id: 'q-mat-4',
      chapterId: 'matrices',
      difficulty: 'basic',
      type: 'single',
      stem: r`设 \(A\) 为 \(n\) 阶方阵，则 \(A\) 可逆的充要条件是（　）。`,
      options: [r`\(\det A\ne0\)`, r`\(A\) 的所有元素非零`, r`\(A\) 不是零矩阵`, r`\(\operatorname{tr}(A)\ne0\)`],
      answer: 0,
      explanation: r`方阵可逆当且仅当其行列式非零，这等价于满秩、列向量线性无关、齐次方程组只有零解。`
    },
    {
      id: 'q-mat-5',
      chapterId: 'matrices',
      difficulty: 'basic',
      type: 'fill',
      stem: r`设 \(A=\operatorname{diag}(2,4)\)，则 \(A^{-1}\) 的第一个对角元素为多少？`,
      answers: ['1/2', '0.5', '二分之一'],
      format: '填写分数或小数',
      explanation: r`对角矩阵的逆仍为对角矩阵，对角元取倒数，因此 \(A^{-1}=\operatorname{diag}(\frac12,\frac14)\)，第一个对角元为 \(\frac12\)。`
    },
    {
      id: 'q-mat-6',
      chapterId: 'matrices',
      difficulty: 'advanced',
      type: 'single',
      stem: r`矩阵 \(A=\begin{pmatrix}1&2&3\\2&4&6\\1&1&1\end{pmatrix}\) 的秩为（　）。`,
      options: [r`\(1\)`, r`\(2\)`, r`\(3\)`, r`\(0\)`],
      answer: 1,
      explanation: r`第二行是第一行的 2 倍，消去后只剩两行独立信息；第一行与第三行不成比例，故秩为 2。`
    },
    {
      id: 'q-mat-7',
      chapterId: 'matrices',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`若 \(AB=O\)，则必有 \(A=O\) 或 \(B=O\)。`,
      answer: 1,
      explanation: r`错误。取 \(A=\begin{pmatrix}1&0\\0&0\end{pmatrix}\)，\(B=\begin{pmatrix}0&0\\0&1\end{pmatrix}\)，则 \(AB=O\)，但 \(A,B\) 都不是零矩阵。`
    },
    {
      id: 'q-mat-8',
      chapterId: 'matrices',
      difficulty: 'advanced',
      type: 'single',
      stem: r`设 \(A\) 为三阶矩阵，且 \(r(A)=2\)，则其伴随矩阵 \(A^{*}\) 的秩为（　）。`,
      options: [r`\(0\)`, r`\(1\)`, r`\(2\)`, r`\(3\)`],
      answer: 1,
      explanation: r`对 \(n\) 阶矩阵：\(r(A)=n\) 时 \(r(A^*)=n\)；\(r(A)=n-1\) 时 \(r(A^*)=1\)；\(r(A)\le n-2\) 时 \(r(A^*)=0\)。本题 \(n=3,r(A)=2\)，故 \(r(A^*)=1\)。`
    },

    /* ================= 向量组 ================= */
    {
      id: 'q-vec-1',
      chapterId: 'vectors',
      difficulty: 'basic',
      type: 'single',
      stem: r`下列向量组中，线性无关的是（　）。`,
      options: [
        r`\((1,0)^{\mathrm T},(0,1)^{\mathrm T}\)`,
        r`\((1,2)^{\mathrm T},(2,4)^{\mathrm T}\)`,
        r`\((0,0)^{\mathrm T},(1,1)^{\mathrm T}\)`,
        r`\((1,1)^{\mathrm T},(2,2)^{\mathrm T},(3,3)^{\mathrm T}\)`
      ],
      answer: 0,
      explanation: r`\((1,0)\) 与 \((0,1)\) 不成比例，线性无关。其余各组都含成比例向量或零向量，因此线性相关。`
    },
    {
      id: 'q-vec-2',
      chapterId: 'vectors',
      difficulty: 'basic',
      type: 'judge',
      stem: r`含有零向量的向量组一定线性相关。`,
      answer: 0,
      explanation: r`正确。若向量组含零向量，取零向量的系数为 1、其余系数为 0，就得到非平凡线性组合等于零向量。`
    },
    {
      id: 'q-vec-3',
      chapterId: 'vectors',
      difficulty: 'basic',
      type: 'fill',
      stem: r`向量组 \(\boldsymbol{\alpha}_1=(1,0)^{\mathrm T}\)，\(\boldsymbol{\alpha}_2=(0,1)^{\mathrm T}\)，\(\boldsymbol{\alpha}_3=(1,1)^{\mathrm T}\) 的秩为多少？`,
      answers: ['2', '二'],
      format: '填写一个整数',
      explanation: r`\(\boldsymbol{\alpha}_3=\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_2\)，而 \(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2\) 线性无关，所以秩为 2，极大无关组含 2 个向量。`
    },
    {
      id: 'q-vec-4',
      chapterId: 'vectors',
      difficulty: 'basic',
      type: 'single',
      stem: r`向量 \((1,2,3)^{\mathrm T}\) 与 \((2,0,-1)^{\mathrm T}\) 的内积为（　）。`,
      options: [r`\(-1\)`, r`\(1\)`, r`\(5\)`, r`\(7\)`],
      answer: 0,
      explanation: r`内积等于对应分量乘积之和：\(1\times2+2\times0+3\times(-1)=2-3=-1\)。`
    },
    {
      id: 'q-vec-5',
      chapterId: 'vectors',
      difficulty: 'basic',
      type: 'judge',
      stem: r`一组非零的、两两正交的向量一定线性无关。`,
      answer: 0,
      explanation: r`正确。设 \(\sum k_i\boldsymbol{\alpha}_i=\mathbf{0}\)，与 \(\boldsymbol{\alpha}_j\) 作内积，利用两两正交可得 \(k_j\|\boldsymbol{\alpha}_j\|^2=0\)。由于向量非零，\(k_j=0\)。`
    },
    {
      id: 'q-vec-6',
      chapterId: 'vectors',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`在 \(\mathbb{R}^3\) 中，任意 4 个向量都线性相关。`,
      answer: 0,
      explanation: r`正确。\(\mathbb{R}^3\) 的维数为 3，任意向量组中线性无关向量的个数不超过 3，因此 4 个向量必线性相关。`
    },
    {
      id: 'q-vec-7',
      chapterId: 'vectors',
      difficulty: 'advanced',
      type: 'single',
      stem: r`设 \(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_2,\boldsymbol{\alpha}_3\) 线性无关，则 \(\boldsymbol{\alpha}_1+\boldsymbol{\alpha}_2,\ \boldsymbol{\alpha}_2+\boldsymbol{\alpha}_3,\ \boldsymbol{\alpha}_3+\boldsymbol{\alpha}_1\)（　）。`,
      options: [r`一定线性相关`, r`一定线性无关`, r`可能相关也可能无关`, r`无法判断`],
      answer: 1,
      explanation: r`以新向量为列，系数矩阵为 \(\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}\)，其行列式为 2，非零，所以新向量组线性无关。`
    },
    {
      id: 'q-vec-8',
      chapterId: 'vectors',
      difficulty: 'advanced',
      type: 'single',
      stem: r`对 \(\boldsymbol{\alpha}_1=(1,1)^{\mathrm T}\)、\(\boldsymbol{\alpha}_2=(1,0)^{\mathrm T}\) 作施密特正交化，下列哪组向量两两正交？`,
      options: [
        r`\((1,1)^{\mathrm T},(1,0)^{\mathrm T}\)`,
        r`\((1,1)^{\mathrm T},(1,-1)^{\mathrm T}\)`,
        r`\((1,1)^{\mathrm T},(0,1)^{\mathrm T}\)`,
        r`\((1,0)^{\mathrm T},(0,1)^{\mathrm T}\)`
      ],
      answer: 1,
      explanation: r`取 \(\boldsymbol{\beta}_1=(1,1)^{\mathrm T}\)，减去 \(\boldsymbol{\alpha}_2\) 在 \(\boldsymbol{\beta}_1\) 上的投影得到 \((\frac12,-\frac12)^{\mathrm T}\)，与 \((1,-1)^{\mathrm T}\) 同向。二者内积 \(1-1=0\)。`
    },

    /* ================= 线性方程组 ================= */
    {
      id: 'q-sys-1',
      chapterId: 'systems',
      difficulty: 'basic',
      type: 'single',
      stem: r`设 \(A\) 为 \(m\times n\) 矩阵，方程组 \(A\mathbf{x}=\mathbf{b}\) 有唯一解的充要条件是（　）。`,
      options: [
        r`\(r(A)=r(A\mid\mathbf{b})=n\)`,
        r`\(r(A)=r(A\mid\mathbf{b})<n\)`,
        r`\(r(A)<r(A\mid\mathbf{b})\)`,
        r`\(r(A)=m\)`
      ],
      answer: 0,
      explanation: r`有解要求 \(r(A)=r(A\mid\mathbf{b})\)；唯一解要求没有自由变量，即秩等于未知量个数 \(n\)。`
    },
    {
      id: 'q-sys-2',
      chapterId: 'systems',
      difficulty: 'basic',
      type: 'judge',
      stem: r`齐次线性方程组 \(A\mathbf{x}=\mathbf{0}\) 一定有解。`,
      answer: 0,
      explanation: r`正确。\(\mathbf{x}=\mathbf{0}\) 永远是一个解。齐次方程组不会无解，只可能只有零解或有无穷多解。`
    },
    {
      id: 'q-sys-3',
      chapterId: 'systems',
      difficulty: 'basic',
      type: 'single',
      stem: r`若齐次方程组有 4 个未知量，系数矩阵的秩为 2，则其基础解系含（　）个向量。`,
      options: [r`\(1\)`, r`\(2\)`, r`\(3\)`, r`\(4\)`],
      answer: 1,
      explanation: r`解空间维数为 \(n-r=4-2=2\)，基础解系所含向量个数等于解空间维数。`
    },
    {
      id: 'q-sys-4',
      chapterId: 'systems',
      difficulty: 'basic',
      type: 'fill',
      stem: r`若方程组有 3 个未知量，且 \(r(A)=r(A\mid\mathbf{b})=2\)，则自由变量有多少个？`,
      answers: ['1', '一'],
      format: '填写一个整数',
      explanation: r`自由变量个数为 \(n-r=3-2=1\)，因此方程组有无穷多解，通解含一个参数。`
    },
    {
      id: 'q-sys-5',
      chapterId: 'systems',
      difficulty: 'basic',
      type: 'judge',
      stem: r`设 \(A\) 为 \(n\) 阶方阵，则 \(A\mathbf{x}=\mathbf{0}\) 有非零解当且仅当 \(\det A=0\)。`,
      answer: 0,
      explanation: r`正确。\(A\mathbf{x}=\mathbf{0}\) 有非零解等价于 \(A\) 不可逆，也等价于 \(\det A=0\)。`
    },
    {
      id: 'q-sys-6',
      chapterId: 'systems',
      difficulty: 'advanced',
      type: 'single',
      stem: r`当 \(\lambda\) 取何值时，方程组 \(\begin{cases}\lambda x+y=1,\\ x+\lambda y=1\end{cases}\) 无解？`,
      options: [r`\(\lambda=-1\)`, r`\(\lambda=0\)`, r`\(\lambda=1\)`, r`\(\lambda=2\)`],
      answer: 0,
      explanation: r`系数行列式为 \(\lambda^2-1\)。\(\lambda=-1\) 时两方程变为 \(-x+y=1\) 与 \(x-y=1\)，即 \(x-y=-1\) 与 \(x-y=1\)，矛盾，故无解。`
    },
    {
      id: 'q-sys-7',
      chapterId: 'systems',
      difficulty: 'advanced',
      type: 'single',
      stem: r`设 \(A\) 为 \(3\times4\) 矩阵，\(r(A)=2\)，且 \(A\mathbf{x}=\mathbf{b}\) 有解，则其解集中自由变量的个数为（　）。`,
      options: [r`\(1\)`, r`\(2\)`, r`\(3\)`, r`\(4\)`],
      answer: 1,
      explanation: r`有解时 \(r(A)=r(A\mid\mathbf{b})=2\)，未知量个数为 4，自由变量个数为 \(4-2=2\)。`
    },
    {
      id: 'q-sys-8',
      chapterId: 'systems',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`若非齐次方程组 \(A\mathbf{x}=\mathbf{b}\) 有两个不同的解，则它必有无穷多解。`,
      answer: 0,
      explanation: r`正确。设两解为 \(\boldsymbol{\eta}_1\ne\boldsymbol{\eta}_2\)，则 \(\boldsymbol{\eta}_1-\boldsymbol{\eta}_2\) 是齐次方程组的非零解。于是 \(\boldsymbol{\eta}_1+k(\boldsymbol{\eta}_1-\boldsymbol{\eta}_2)\) 对任意 \(k\) 都是解，故有无穷多解。`
    },

    /* ================= 特征值 ================= */
    {
      id: 'q-eig-1',
      chapterId: 'eigen',
      difficulty: 'basic',
      type: 'single',
      stem: r`对角矩阵 \(\operatorname{diag}(2,3,5)\) 的特征值为（　）。`,
      options: [
        r`\(2,3,5\)`,
        r`\(1,1,1\)`,
        r`\(0,0,0\)`,
        r`\(2,2,2\)`
      ],
      answer: 0,
      explanation: r`对角矩阵或三角矩阵的特征值就是主对角线元素。因此三个特征值为 \(2,3,5\)。`
    },
    {
      id: 'q-eig-2',
      chapterId: 'eigen',
      difficulty: 'basic',
      type: 'fill',
      stem: r`若二阶矩阵 \(A\) 的特征值为 \(1\) 和 \(4\)，则 \(\operatorname{tr}(A)=\) 多少？`,
      answers: ['5', '+5'],
      format: '填写一个整数',
      explanation: r`特征值之和等于矩阵的迹，因此 \(\operatorname{tr}(A)=1+4=5\)。`
    },
    {
      id: 'q-eig-3',
      chapterId: 'eigen',
      difficulty: 'basic',
      type: 'judge',
      stem: r`特征向量可以是零向量。`,
      answer: 1,
      explanation: r`错误。零向量对任何 \(\lambda\) 都满足 \(A\mathbf{0}=\lambda\mathbf{0}\)，无法提供方向信息，因此特征向量必须是非零向量。`
    },
    {
      id: 'q-eig-4',
      chapterId: 'eigen',
      difficulty: 'basic',
      type: 'single',
      stem: r`矩阵 \(\begin{pmatrix}2&1\\1&2\end{pmatrix}\) 的特征值为（　）。`,
      options: [r`\(1,3\)`, r`\(2,2\)`, r`\(0,4\)`, r`\(-1,5\)`],
      answer: 0,
      explanation: r`特征多项式为 \((2-\lambda)^2-1=(\lambda-1)(\lambda-3)\)，所以特征值为 \(1,3\)。`
    },
    {
      id: 'q-eig-5',
      chapterId: 'eigen',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`属于不同特征值的特征向量一定线性无关。`,
      answer: 0,
      explanation: r`正确。这是特征值理论的基本结论；更一般地，从不同特征子空间中各取线性无关组，合并后仍线性无关。`
    },
    {
      id: 'q-eig-6',
      chapterId: 'eigen',
      difficulty: 'advanced',
      type: 'single',
      stem: r`矩阵 \(A=\begin{pmatrix}1&1\\0&1\end{pmatrix}\)（　）。`,
      options: [
        r`可对角化，因为特征值为 1`,
        r`不可对角化，因为只有一个线性无关的特征向量`,
        r`可对角化，因为它是三角矩阵`,
        r`不可对角化，因为它的行列式为 1`
      ],
      answer: 1,
      explanation: r`特征值为 1（二重），但 \(A-I=\begin{pmatrix}0&1\\0&0\end{pmatrix}\) 的秩为 1，特征子空间只有一维，几何重数 1 小于代数重数 2，因此不可对角化。`
    },
    {
      id: 'q-eig-7',
      chapterId: 'eigen',
      difficulty: 'advanced',
      type: 'fill',
      stem: r`三阶矩阵 \(A\) 的特征值为 \(1,2,3\)，则 \(\det A=\) 多少？`,
      answers: ['6', '+6'],
      format: '填写一个整数',
      explanation: r`特征值之积等于行列式：\(\det A=1\times2\times3=6\)。`
    },
    {
      id: 'q-eig-8',
      chapterId: 'eigen',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`实对称矩阵一定可以正交对角化。`,
      answer: 0,
      explanation: r`正确。实对称矩阵的特征值全为实，不同特征值的特征向量正交，且一定存在正交矩阵 \(Q\) 使 \(Q^{\mathrm T}AQ\) 为对角矩阵。`
    },

    /* ================= 二次型 ================= */
    {
      id: 'q-quad-1',
      chapterId: 'quadratic',
      difficulty: 'basic',
      type: 'single',
      stem: r`二次型 \(f=x_1^2+4x_1x_2+3x_2^2\) 的矩阵为（　）。`,
      options: [
        r`\(\begin{pmatrix}1&2\\2&3\end{pmatrix}\)`,
        r`\(\begin{pmatrix}1&4\\4&3\end{pmatrix}\)`,
        r`\(\begin{pmatrix}1&0\\0&3\end{pmatrix}\)`,
        r`\(\begin{pmatrix}1&2\\0&3\end{pmatrix}\)`
      ],
      answer: 0,
      explanation: r`平方项系数放在主对角线，交叉项系数 \(4\) 除以 2 后对称放置，因此 \(a_{12}=a_{21}=2\)。`
    },
    {
      id: 'q-quad-2',
      chapterId: 'quadratic',
      difficulty: 'basic',
      type: 'judge',
      stem: r`任何二次型都可以用一个实对称矩阵表示。`,
      answer: 0,
      explanation: r`正确。交叉项系数平均分给 \(a_{ij}\) 与 \(a_{ji}\)，即可得到唯一的实对称矩阵 \(A\)，使 \(f=\mathbf{x}^{\mathrm T}A\mathbf{x}\)。`
    },
    {
      id: 'q-quad-3',
      chapterId: 'quadratic',
      difficulty: 'basic',
      type: 'fill',
      stem: r`二次型 \(f=x_1^2-x_2^2+2x_3^2\) 的正惯性指数为多少？`,
      answers: ['2', '二'],
      format: '填写一个整数',
      explanation: r`标准形已经只含平方项，系数为正的有 \(x_1^2\) 与 \(2x_3^2\)，所以正惯性指数 \(p=2\)，负惯性指数 \(q=1\)。`
    },
    {
      id: 'q-quad-4',
      chapterId: 'quadratic',
      difficulty: 'basic',
      type: 'single',
      stem: r`矩阵 \(\begin{pmatrix}2&1\\1&2\end{pmatrix}\) 是（　）。`,
      options: [r`正定矩阵`, r`负定矩阵`, r`半正定矩阵`, r`不定矩阵`],
      answer: 0,
      explanation: r`顺序主子式：\(\Delta_1=2>0\)，\(\Delta_2=3>0\)，所以正定。也可由特征值 \(1,3\) 全为正判断。`
    },
    {
      id: 'q-quad-5',
      chapterId: 'quadratic',
      difficulty: 'basic',
      type: 'judge',
      stem: r`若实对称矩阵的所有特征值都大于零，则该矩阵正定。`,
      answer: 0,
      explanation: r`正确。正交对角化后 \(f=\lambda_1y_1^2+\cdots+\lambda_ny_n^2\)，所有 \(\lambda_i>0\)，对任意非零 \(\mathbf{x}\) 都有 \(f>0\)。`
    },
    {
      id: 'q-quad-6',
      chapterId: 'quadratic',
      difficulty: 'advanced',
      type: 'single',
      stem: r`下列矩阵中，正定的是（　）。`,
      options: [
        r`\(\begin{pmatrix}1&2\\2&1\end{pmatrix}\)`,
        r`\(\begin{pmatrix}2&1\\1&2\end{pmatrix}\)`,
        r`\(\begin{pmatrix}-1&0\\0&-2\end{pmatrix}\)`,
        r`\(\begin{pmatrix}1&0\\0&0\end{pmatrix}\)`
      ],
      answer: 1,
      explanation: r`B 的顺序主子式为 \(2>0\)、\(3>0\)，正定。A 的行列式为 \(-3<0\)，不定；C 负定；D 半正定但不正定。`
    },
    {
      id: 'q-quad-7',
      chapterId: 'quadratic',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`两个合同的实对称矩阵一定有相同的特征值。`,
      answer: 1,
      explanation: r`错误。合同只保持秩与惯性指数，不保持特征值。例如 \(I_2\) 与 \(\operatorname{diag}(2,2)\) 合同，但特征值不同。相似矩阵才保持特征值。`
    },
    {
      id: 'q-quad-8',
      chapterId: 'quadratic',
      difficulty: 'advanced',
      type: 'fill',
      stem: r`二次型 \(f=(x_1+x_2)^2\) 的正惯性指数为多少？`,
      answers: ['1', '一'],
      format: '填写一个整数',
      explanation: r`把它看作一个平方项：\(f=y_1^2\)，其中 \(y_1=x_1+x_2\)。因此 \(p=1,q=0\)，矩阵的秩为 1。`
    },

    /* ================= 线性空间 ================= */
    {
      id: 'q-space-1',
      chapterId: 'spaces',
      difficulty: 'basic',
      type: 'single',
      stem: r`向量组 \((1,0,1)^{\mathrm T}\)、\((0,1,0)^{\mathrm T}\) 张成的子空间维数为（　）。`,
      options: [r`\(1\)`, r`\(2\)`, r`\(3\)`, r`\(0\)`],
      answer: 1,
      explanation: r`两个向量不成比例，线性无关，因此它们张成的子空间维数为 2，是 \(\mathbb{R}^3\) 中的一个平面。`
    },
    {
      id: 'q-space-2',
      chapterId: 'spaces',
      difficulty: 'basic',
      type: 'judge',
      stem: r`任意 \(n\) 维线性空间都与 \(\mathbb{R}^n\) 同构。`,
      answer: 0,
      explanation: r`正确。选定一组基后，每个向量对应唯一的坐标向量，这个映射是线性双射，因此任意 \(n\) 维实线性空间都同构于 \(\mathbb{R}^n\)。`
    },
    {
      id: 'q-space-3',
      chapterId: 'spaces',
      difficulty: 'basic',
      type: 'fill',
      stem: r`次数不超过 \(n\) 的实系数多项式空间 \(P_n[x]\) 的维数为多少？`,
      answers: ['n+1', 'n＋1', 'n + 1'],
      format: '填写含 n 的表达式',
      explanation: r`一组基为 \(1,x,x^2,\dots,x^n\)，共 \(n+1\) 个基向量，所以维数为 \(n+1\)。`
    },
    {
      id: 'q-space-4',
      chapterId: 'spaces',
      difficulty: 'basic',
      type: 'single',
      stem: r`设线性变换 \(T:V\to W\)，\(\dim V=5\)，\(\dim\ker T=2\)，则 \(\dim\operatorname{Im}T=\)（　）。`,
      options: [r`\(2\)`, r`\(3\)`, r`\(5\)`, r`\(7\)`],
      answer: 1,
      explanation: r`由秩-零化度定理，\(\dim V=\dim\ker T+\dim\operatorname{Im}T\)，所以 \(\dim\operatorname{Im}T=5-2=3\)。`
    },
    {
      id: 'q-space-5',
      chapterId: 'spaces',
      difficulty: 'basic',
      type: 'judge',
      stem: r`线性变换的核一定是定义域的子空间。`,
      answer: 0,
      explanation: r`正确。若 \(T(\mathbf{x})=T(\mathbf{y})=\mathbf{0}\)，则 \(T(\mathbf{x}+\mathbf{y})=\mathbf{0}\)，\(T(k\mathbf{x})=\mathbf{0}\)，所以核对加法与数乘封闭。`
    },
    {
      id: 'q-space-6',
      chapterId: 'spaces',
      difficulty: 'advanced',
      type: 'single',
      stem: r`关于相似矩阵，下列说法正确的是（　）。`,
      options: [
        r`相似矩阵一定相等`,
        r`相似矩阵有相同的特征值`,
        r`相似矩阵一定有相同的元素`,
        r`相似矩阵一定都是对称矩阵`
      ],
      answer: 1,
      explanation: r`相似矩阵具有相同的特征多项式，因此特征值（含代数重数）相同；同时行列式、迹、秩也相同，但矩阵本身一般不相等。`
    },
    {
      id: 'q-space-7',
      chapterId: 'spaces',
      difficulty: 'advanced',
      type: 'judge',
      stem: r`两个实对称矩阵若合同，则它们一定相似。`,
      answer: 1,
      explanation: r`错误。合同保持惯性指数，相似保持特征值。\(I_2\) 与 \(\operatorname{diag}(2,2)\) 合同但不相似，因为特征值不同。`
    },
    {
      id: 'q-space-8',
      chapterId: 'spaces',
      difficulty: 'advanced',
      type: 'single',
      stem: r`在 \(\mathbb{R}^2\) 中取新基 \(\boldsymbol{\eta}_1=(1,1)^{\mathrm T}\)、\(\boldsymbol{\eta}_2=(1,-1)^{\mathrm T}\)，则向量 \((3,1)^{\mathrm T}\) 在新基下的坐标为（　）。`,
      options: [r`\((2,1)^{\mathrm T}\)`, r`\((1,2)^{\mathrm T}\)`, r`\((3,1)^{\mathrm T}\)`, r`\((4,0)^{\mathrm T}\)`],
      answer: 0,
      explanation: r`过渡矩阵 \(P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)，\(P^{-1}=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)，所以新坐标 \(P^{-1}(3,1)^{\mathrm T}=(2,1)^{\mathrm T}\)。验证：\(2(1,1)+1(1,-1)=(3,1)\)。`
    }
  ];
})();
