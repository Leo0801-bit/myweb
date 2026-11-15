/* 线代 · 研学室 — 公式手册数据 */
(function () {
  const r = String.raw;

  window.LA_FORMULAS = [
    /* ---------------- 行列式 ---------------- */
    {
      id: 'det-2x2',
      chapterId: 'determinants',
      title: '二阶行列式',
      label: '计算',
      tex: r`\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc`,
      description: '主对角线之积减去副对角线之积，结果是数。',
      condition: '二阶方阵',
      tags: ['行列式', '基础']
    },
    {
      id: 'det-3x3',
      chapterId: 'determinants',
      title: '三阶行列式',
      label: '计算',
      tex: r`\begin{aligned}
      \begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix}
      &=\ a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}\\
      &\quad -a_{13}a_{22}a_{31}-a_{11}a_{23}a_{32}-a_{12}a_{21}a_{33}
      \end{aligned}`,
      description: '对角线法则：三条右下斜线取正，三条左下斜线取负。',
      condition: '仅适用于二阶、三阶行列式',
      tags: ['行列式', '对角线法则']
    },
    {
      id: 'det-n',
      chapterId: 'determinants',
      title: 'n 阶行列式的定义',
      label: '定义',
      tex: r`\det A=\sum_{p_1p_2\cdots p_n}(-1)^{\tau(p_1p_2\cdots p_n)}
      a_{1p_1}a_{2p_2}\cdots a_{np_n}`,
      description: '遍历所有 n 级排列，每行每列各取一个元素相乘，符号由列排列的逆序数决定。',
      condition: 'A 为 n 阶方阵',
      tags: ['行列式', '逆序数', '全排列']
    },
    {
      id: 'det-transpose',
      chapterId: 'determinants',
      title: '转置行列式',
      label: '性质',
      tex: r`\det(A^{\mathrm T})=\det A`,
      description: '行列式对行与列地位对称，因此行具有的性质，列也具有。',
      condition: 'A 为方阵',
      tags: ['行列式', '转置']
    },
    {
      id: 'det-rowops',
      chapterId: 'determinants',
      title: '行列式的行变换性质',
      label: '性质',
      tex: r`\begin{aligned}
      r_i\leftrightarrow r_j&\Rightarrow \det\mapsto-\det,\\
      r_i\leftarrow kr_i&\Rightarrow \det\mapsto k\det,\\
      r_i\leftarrow r_i+kr_j&\Rightarrow \det\text{ 不变}.
      \end{aligned}`,
      description: '交换两行变号；数乘某一行提出倍率；一行加上另一行的倍数，行列式不变。',
      condition: 'k 为常数；倍加时 k 可任意',
      tags: ['行列式', '初等变换']
    },
    {
      id: 'det-cofactor',
      chapterId: 'determinants',
      title: '按行（列）展开',
      label: '核心',
      tex: r`\det A=\sum_{j=1}^{n}a_{ij}A_{ij},\qquad
      A_{ij}=(-1)^{i+j}M_{ij}`,
      description: '沿任意一行或一列展开，把 n 阶行列式降为 n−1 阶行列式。',
      condition: 'A 为 n 阶方阵；可沿任意固定行 i 或列 j 展开',
      tags: ['行列式', '代数余子式', '展开']
    },
    {
      id: 'det-triangular',
      chapterId: 'determinants',
      title: '三角与对角行列式',
      label: '计算',
      tex: r`\begin{vmatrix}
      a_{11}&a_{12}&\cdots&a_{1n}\\
      0&a_{22}&\cdots&a_{2n}\\
      \vdots&\vdots&\ddots&\vdots\\
      0&0&\cdots&a_{nn}
      \end{vmatrix}=a_{11}a_{22}\cdots a_{nn}`,
      description: '上三角、下三角、对角行列式都等于主对角线元素之积。',
      condition: '对角线一侧的元素全为零',
      tags: ['行列式', '三角矩阵', '计算']
    },
    {
      id: 'det-vandermonde',
      chapterId: 'determinants',
      title: '范德蒙德行列式',
      label: '特殊结构',
      tex: r`V_n(x_1,\dots,x_n)=
      \begin{vmatrix}
      1&1&\cdots&1\\
      x_1&x_2&\cdots&x_n\\
      \vdots&\vdots&&\vdots\\
      x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
      \end{vmatrix}
      =\prod_{1\le i<j\le n}(x_j-x_i)`,
      description: '差积公式；当且仅当各 xᵢ 互不相同时，行列式非零。',
      condition: '列按 x₁,…,xₙ 顺序排列',
      tags: ['行列式', '范德蒙德', '特殊结构']
    },
    {
      id: 'det-block',
      chapterId: 'determinants',
      title: '分块三角行列式',
      label: '特殊结构',
      tex: r`\begin{vmatrix}A&C\\O&B\end{vmatrix}
      =\begin{vmatrix}A&O\\C&B\end{vmatrix}
      =\det A\cdot\det B`,
      description: '分块三角行列式等于两个对角块行列式之积，与另一侧的块无关。',
      condition: 'A、B 为方阵',
      tags: ['行列式', '分块矩阵']
    },
    {
      id: 'det-cramer',
      chapterId: 'determinants',
      title: '克拉默法则',
      label: '定理',
      tex: r`x_j=\frac{D_j}{D},\qquad D=\det A\ne0,\quad j=1,2,\dots,n`,
      description: 'Dⱼ 是把 A 的第 j 列替换成常数列 b 后得到的行列式；用于理论分析而非大规模计算。',
      condition: 'n 个方程、n 个未知量，且系数行列式非零',
      tags: ['行列式', '线性方程组', '克拉默']
    },

    /* ---------------- 矩阵 ---------------- */
    {
      id: 'mat-multiply',
      chapterId: 'matrices',
      title: '矩阵乘法',
      label: '计算',
      tex: r`(AB)_{ij}=\sum_{k=1}^{s}a_{ik}b_{kj}`,
      description: '左矩阵第 i 行与右矩阵第 j 列逐项相乘再相加，得到积矩阵的第 i 行第 j 列。',
      condition: 'A 为 m×s 矩阵，B 为 s×n 矩阵',
      tags: ['矩阵', '乘法']
    },
    {
      id: 'mat-transpose',
      chapterId: 'matrices',
      title: '转置的运算规律',
      label: '性质',
      tex: r`(A+B)^{\mathrm T}=A^{\mathrm T}+B^{\mathrm T},\quad
      (AB)^{\mathrm T}=B^{\mathrm T}A^{\mathrm T},\quad
      (A^{\mathrm T})^{\mathrm T}=A`,
      description: '乘积转置要反序；矩阵加法转置则逐项进行。',
      condition: '乘法需满足维度匹配',
      tags: ['矩阵', '转置']
    },
    {
      id: 'mat-inverse-2x2',
      chapterId: 'matrices',
      title: '二阶矩阵求逆',
      label: '计算',
      tex: r`\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}
      =\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`,
      description: '主对角线交换，副对角线变号，再除以行列式。',
      condition: 'ad−bc≠0',
      tags: ['矩阵', '逆矩阵', '二阶']
    },
    {
      id: 'mat-adjugate',
      chapterId: 'matrices',
      title: '伴随矩阵求逆',
      label: '核心',
      tex: r`A^{-1}=\frac{1}{\det A}A^{*},\qquad
      AA^{*}=A^{*}A=(\det A)I`,
      description: 'A* 的 (i,j) 元是 A 的 (j,i) 元代数余子式；先求余子式矩阵再转置。',
      condition: 'A 可逆，即 det A≠0',
      tags: ['矩阵', '伴随矩阵', '逆矩阵']
    },
    {
      id: 'mat-inverse-props',
      chapterId: 'matrices',
      title: '逆矩阵的运算性质',
      label: '性质',
      tex: r`(AB)^{-1}=B^{-1}A^{-1},\quad
      (A^{\mathrm T})^{-1}=(A^{-1})^{\mathrm T},\quad
      (kA)^{-1}=\frac1k A^{-1}`,
      description: '乘积求逆反序；转置与求逆可交换；数乘求逆提出倒数。',
      condition: 'A、B 可逆，k≠0',
      tags: ['矩阵', '逆矩阵', '运算法则']
    },
    {
      id: 'mat-elementary-inverse',
      chapterId: 'matrices',
      title: '初等行变换求逆',
      label: '方法',
      tex: r`(A\mid I)\ \xrightarrow{\text{行变换}}\ (I\mid A^{-1})`,
      description: '对增广矩阵只做初等行变换，左半化成单位矩阵时，右半即为逆矩阵。',
      condition: 'A 可逆；若左半无法化为 I，则 A 不可逆',
      tags: ['矩阵', '初等变换', '逆矩阵']
    },
    {
      id: 'mat-rank-properties',
      chapterId: 'matrices',
      title: '秩的基本性质',
      label: '性质',
      tex: r`r(A)=r(A^{\mathrm T}),\quad
      r(A)\le\min(m,n),\quad
      r(kA)=r(A)\ (k\ne0)`,
      description: '行秩等于列秩；秩不超过行数与列数的较小者；非零数乘不改变秩。',
      condition: 'A 为 m×n 矩阵',
      tags: ['矩阵', '秩']
    },
    {
      id: 'mat-rank-inequality',
      chapterId: 'matrices',
      title: '乘积与和的秩',
      label: '不等式',
      tex: r`r(AB)\le\min\{r(A),r(B)\},\qquad
      r(A+B)\le r(A)+r(B)`,
      description: '乘积的秩不会超过任一因子；和的秩不超过秩之和。',
      condition: 'AB 有意义，A、B 同型（加法式）',
      tags: ['矩阵', '秩', '不等式']
    },
    {
      id: 'mat-sylvester',
      chapterId: 'matrices',
      title: 'Sylvester 秩不等式',
      label: '不等式',
      tex: r`r(A)+r(B)-n\le r(AB)\le\min\{r(A),r(B)\}`,
      description: '其中 n 是 A 的列数，也是 B 的行数；当 AB=O 时可推出 r(A)+r(B)≤n。',
      condition: 'A 为 m×n，B 为 n×s',
      tags: ['矩阵', '秩', 'Sylvester']
    },
    {
      id: 'mat-block-inverse',
      chapterId: 'matrices',
      title: '分块对角矩阵求逆',
      label: '特殊结构',
      tex: r`\begin{pmatrix}A&O\\O&B\end{pmatrix}^{-1}
      =\begin{pmatrix}A^{-1}&O\\O&B^{-1}\end{pmatrix}`,
      description: '分块对角矩阵求逆，只需各对角块分别求逆。',
      condition: 'A、B 均可逆',
      tags: ['矩阵', '分块矩阵', '逆矩阵']
    },

    /* ---------------- 向量组 ---------------- */
    {
      id: 'vec-independence',
      chapterId: 'vectors',
      title: '线性相关的秩判别',
      label: '判定',
      tex: r`\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s\text{ 线性相关}
      \iff r(A)<s,\qquad A=(\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s)`,
      description: '向量组线性无关当且仅当 rank(A)=s；方阵情形等价于 det A≠0。',
      condition: 'A 把向量按列排列',
      tags: ['向量组', '线性相关', '秩']
    },
    {
      id: 'vec-combination',
      chapterId: 'vectors',
      title: '线性表示与方程组',
      label: '转化',
      tex: r`x_1\boldsymbol{\alpha}_1+\cdots+x_s\boldsymbol{\alpha}_s=\boldsymbol{\beta}
      \iff A\mathbf{x}=\boldsymbol{\beta}`,
      description: 'β 能否由向量组线性表示，等价于对应的非齐次方程组是否有解。',
      condition: 'A 的列向量为 α₁,…,αₛ',
      tags: ['向量组', '线性表示', '线性方程组']
    },
    {
      id: 'vec-max-independent',
      chapterId: 'vectors',
      title: '极大无关组与秩',
      label: '核心',
      tex: r`r(\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s)
      =\text{极大无关组所含向量的个数}`,
      description: '把向量按列摆成矩阵，化行最简形，主元所在列对应一个极大无关组。',
      condition: '求列向量组时只能做初等行变换',
      tags: ['向量组', '极大无关组', '秩']
    },
    {
      id: 'vec-basis-dimension',
      chapterId: 'vectors',
      title: '基与维数',
      label: '定义',
      tex: r`\dim V=n\iff V\text{ 中存在 }n\text{ 个线性无关的向量，且它们生成 }V`,
      description: '基是线性无关的生成组；维数是基所含向量的个数，也是空间的自由度。',
      condition: 'V 为有限维线性空间',
      tags: ['向量空间', '基', '维数']
    },
    {
      id: 'vec-inner',
      chapterId: 'vectors',
      title: '内积、长度与夹角',
      label: '计算',
      tex: r`(\boldsymbol{\alpha},\boldsymbol{\beta})=\boldsymbol{\alpha}^{\mathrm T}\boldsymbol{\beta},
      \quad \|\boldsymbol{\alpha}\|=\sqrt{(\boldsymbol{\alpha},\boldsymbol{\alpha})},
      \quad \cos\theta=\frac{(\boldsymbol{\alpha},\boldsymbol{\beta})}
      {\|\boldsymbol{\alpha}\|\|\boldsymbol{\beta}\|}`,
      description: '内积为对应分量乘积之和；长度是自身内积的平方根；夹角由余弦公式给出。',
      condition: 'α、β 为非零向量（夹角公式）',
      tags: ['向量', '内积', '正交']
    },
    {
      id: 'vec-cauchy',
      chapterId: 'vectors',
      title: 'Cauchy–Schwarz 不等式',
      label: '不等式',
      tex: r`|(\boldsymbol{\alpha},\boldsymbol{\beta})|
      \le\|\boldsymbol{\alpha}\|\,\|\boldsymbol{\beta}\|`,
      description: '内积的绝对值不超过长度之积；等号成立当且仅当两向量线性相关。',
      condition: '任意向量 α、β',
      tags: ['向量', '内积', '不等式']
    },
    {
      id: 'vec-gram-schmidt',
      chapterId: 'vectors',
      title: '施密特正交化',
      label: '方法',
      tex: r`\boldsymbol{\beta}_k=\boldsymbol{\alpha}_k-
      \sum_{i=1}^{k-1}
      \frac{(\boldsymbol{\alpha}_k,\boldsymbol{\beta}_i)}
      {(\boldsymbol{\beta}_i,\boldsymbol{\beta}_i)}\boldsymbol{\beta}_i,
      \qquad
      \mathbf{e}_k=\frac{\boldsymbol{\beta}_k}{\|\boldsymbol{\beta}_k\|}`,
      description: '逐步减去在前面各方向上的投影，得到两两正交的向量组，再单位化。',
      condition: 'α₁,…,αₛ 线性无关',
      tags: ['向量', '正交化', '施密特']
    },
    {
      id: 'vec-orthogonal-matrix',
      chapterId: 'vectors',
      title: '正交矩阵',
      label: '性质',
      tex: r`Q^{\mathrm T}Q=QQ^{\mathrm T}=I
      \iff Q^{-1}=Q^{\mathrm T}`,
      description: '列（行）向量构成标准正交组；正交变换保持长度、内积与夹角。',
      condition: 'Q 为实方阵',
      tags: ['矩阵', '正交矩阵', '标准正交基']
    },

    /* ---------------- 线性方程组 ---------------- */
    {
      id: 'sys-rank-criterion',
      chapterId: 'systems',
      title: '方程组解的秩判定',
      label: '核心',
      tex: r`\begin{cases}
      r(A)<r(A\mid\mathbf{b}) & \text{无解},\\
      r(A)=r(A\mid\mathbf{b})=n & \text{唯一解},\\
      r(A)=r(A\mid\mathbf{b})<n & \text{无穷多解}.
      \end{cases}`,
      description: '比较系数矩阵与增广矩阵的秩，再与未知量个数 n 比较。',
      condition: 'A 为 m×n 矩阵，n 为未知量个数',
      tags: ['线性方程组', '秩', '判定']
    },
    {
      id: 'sys-homogeneous-dim',
      chapterId: 'systems',
      title: '齐次解空间的维数',
      label: '核心',
      tex: r`\dim N(A)=n-r(A)`,
      description: '基础解系所含向量个数等于未知量个数减去系数矩阵的秩。',
      condition: 'A 为 m×n 矩阵，r(A)<n',
      tags: ['线性方程组', '齐次', '基础解系']
    },
    {
      id: 'sys-general-solution',
      chapterId: 'systems',
      title: '非齐次方程组的通解',
      label: '结构',
      tex: r`\mathbf{x}=\boldsymbol{\eta}_0+
      k_1\boldsymbol{\xi}_1+\cdots+k_{n-r}\boldsymbol{\xi}_{n-r}`,
      description: '一个特解加上齐次方程组的通解，构成非齐次方程组的全部解。',
      condition: '非齐次方程组有解；η₀ 为任一特解，ξᵢ 为基础解系',
      tags: ['线性方程组', '通解', '特解']
    },
    {
      id: 'sys-matrix-equation',
      chapterId: 'systems',
      title: '矩阵方程有解的条件',
      label: '判定',
      tex: r`AX=B\text{ 有解}\iff r(A)=r(A\mid B)`,
      description: '把 B 的每一列分别看作右端项；若 r(A)=n 且解存在，则解矩阵唯一。',
      condition: 'A 为 m×n，B 为 m×p',
      tags: ['矩阵方程', '线性方程组', '秩']
    },
    {
      id: 'sys-solution-count',
      chapterId: 'systems',
      title: '齐次与非齐次对照',
      label: '对照',
      tex: r`\begin{array}{c|c}
      A\mathbf{x}=\mathbf{0} & A\mathbf{x}=\mathbf{b}\\
      \hline
      \text{必有零解} & \text{可能无解}\\
      r=n:\ \text{唯一零解} & r(A)=r(A\mid\mathbf{b})=n:\ \text{唯一解}\\
      r<n:\ \text{无穷多解} & r=r(A\mid\mathbf{b})<n:\ \text{无穷多解}
      \end{array}`,
      description: '齐次方程组永远有零解，非齐次方程组需要额外判断相容性。',
      condition: 'n 为未知量个数，r=r(A)',
      tags: ['线性方程组', '对照', '总结']
    },

    /* ---------------- 特征值 ---------------- */
    {
      id: 'eigen-equation',
      chapterId: 'eigen',
      title: '特征方程',
      label: '核心',
      tex: r`A\mathbf{x}=\lambda\mathbf{x}\ (\mathbf{x}\ne\mathbf{0})
      \iff \det(A-\lambda I)=0`,
      description: '特征值是特征多项式的根；对每个特征值，解齐次方程组得到特征向量。',
      condition: 'A 为 n 阶方阵',
      tags: ['特征值', '特征向量', '特征方程']
    },
    {
      id: 'eigen-trace-det',
      chapterId: 'eigen',
      title: '特征值与迹、行列式',
      label: '性质',
      tex: r`\sum_{i=1}^{n}\lambda_i=\operatorname{tr}(A),
      \qquad
      \prod_{i=1}^{n}\lambda_i=\det A`,
      description: '特征值之和等于迹，之积等于行列式；可用于快速验算。',
      condition: 'λᵢ 按代数重数计入',
      tags: ['特征值', '迹', '行列式']
    },
    {
      id: 'eigen-powers',
      chapterId: 'eigen',
      title: '特征值的运算',
      label: '性质',
      tex: r`A\mathbf{x}=\lambda\mathbf{x}
      \Longrightarrow
      A^k\mathbf{x}=\lambda^k\mathbf{x},\quad
      f(A)\mathbf{x}=f(\lambda)\mathbf{x}`,
      description: '多项式、幂运算会作用到特征值上，特征向量保持不变。',
      condition: 'k 为正整数，f 为多项式',
      tags: ['特征值', '矩阵幂', '多项式']
    },
    {
      id: 'eigen-multiplicity',
      chapterId: 'eigen',
      title: '代数重数与几何重数',
      label: '性质',
      tex: r`1\le \dim E_\lambda\le m_\lambda`,
      description: '几何重数是特征子空间维数，代数重数是特征根重数；几何重数不超过代数重数。',
      condition: 'Eλ 为 λ 的特征子空间，mλ 为代数重数',
      tags: ['特征值', '重数', '特征子空间']
    },
    {
      id: 'eigen-diagonalization',
      chapterId: 'eigen',
      title: '相似对角化',
      label: '核心',
      tex: r`P^{-1}AP=\Lambda
      \iff P=(\mathbf{p}_1,\dots,\mathbf{p}_n),\quad
      A\mathbf{p}_i=\lambda_i\mathbf{p}_i`,
      description: 'A 可对角化当且仅当有 n 个线性无关的特征向量；P 的列是特征向量。',
      condition: 'P 可逆；每个特征值的几何重数等于代数重数',
      tags: ['特征值', '相似', '对角化']
    },
    {
      id: 'eigen-symmetric',
      chapterId: 'eigen',
      title: '实对称矩阵正交对角化',
      label: '核心',
      tex: r`A^{\mathrm T}=A
      \Longrightarrow
      \exists Q\text{ 正交},\quad
      Q^{\mathrm T}AQ=\Lambda`,
      description: '实对称矩阵一定可以正交对角化；Q 的列是一组标准正交特征向量。',
      condition: 'A 为实对称矩阵',
      tags: ['实对称矩阵', '正交对角化', '谱定理']
    },
    {
      id: 'eigen-diagonal-power',
      chapterId: 'eigen',
      title: '对角化求矩阵幂',
      label: '应用',
      tex: r`A=P\Lambda P^{-1}
      \Longrightarrow
      A^k=P\Lambda^kP^{-1}`,
      description: '把矩阵幂转化为对角元素的幂，大幅降低计算量。',
      condition: 'A 可对角化，k 为正整数',
      tags: ['矩阵幂', '对角化', '应用']
    },

    /* ---------------- 二次型 ---------------- */
    {
      id: 'quad-matrix',
      chapterId: 'quadratic',
      title: '二次型的矩阵表示',
      label: '核心',
      tex: r`f(x_1,\dots,x_n)=\mathbf{x}^{\mathrm T}A\mathbf{x},
      \qquad A=A^{\mathrm T}`,
      description: '平方项系数放主对角线，交叉项系数除以 2 后对称放置。',
      condition: 'A 为实对称矩阵',
      tags: ['二次型', '对称矩阵']
    },
    {
      id: 'quad-congruence',
      chapterId: 'quadratic',
      title: '合同变换',
      label: '定义',
      tex: r`\mathbf{x}=C\mathbf{y}
      \Longrightarrow
      f=\mathbf{y}^{\mathrm T}(C^{\mathrm T}AC)\mathbf{y}`,
      description: '可逆线性变换把二次型矩阵变为 CᵀAC；合同保持秩与正定性。',
      condition: 'C 为可逆矩阵',
      tags: ['二次型', '合同', '坐标变换']
    },
    {
      id: 'quad-standard',
      chapterId: 'quadratic',
      title: '标准形与正交变换',
      label: '方法',
      tex: r`Q^{\mathrm T}AQ=\Lambda
      \Longrightarrow
      f=\lambda_1y_1^2+\cdots+\lambda_ny_n^2`,
      description: '取正交矩阵 Q 时，标准形系数恰为特征值；正交变换不改变几何形状。',
      condition: 'A 为实对称矩阵，Q 由标准正交特征向量组成',
      tags: ['二次型', '标准形', '正交变换']
    },
    {
      id: 'quad-inertia',
      chapterId: 'quadratic',
      title: '惯性定理',
      label: '定理',
      tex: r`p=\#\{\lambda_i>0\},\quad
      q=\#\{\lambda_i<0\},\quad
      p+q=r(A)`,
      description: '正、负惯性指数是合同不变量，由特征值符号决定。',
      condition: 'A 为实对称矩阵；λᵢ 为特征值',
      tags: ['二次型', '惯性定理', '规范形']
    },
    {
      id: 'quad-positive-eigen',
      chapterId: 'quadratic',
      title: '正定的特征值判定',
      label: '判定',
      tex: r`A\text{ 正定}\iff \lambda_i>0\ (i=1,\dots,n)`,
      description: '实对称矩阵正定当且仅当所有特征值都大于零。',
      condition: 'A 为实对称矩阵',
      tags: ['正定', '特征值', '二次型']
    },
    {
      id: 'quad-sylvester',
      chapterId: 'quadratic',
      title: 'Sylvester 正定判据',
      label: '判定',
      tex: r`A\text{ 正定}\iff
      \Delta_1>0,\ \Delta_2>0,\ \dots,\ \Delta_n>0`,
      description: 'Δₖ 是 A 的左上角 k 阶顺序主子式；全部大于零时 A 正定。',
      condition: 'A 为实对称矩阵',
      tags: ['正定', '顺序主子式', 'Sylvester']
    },
    {
      id: 'quad-rayleigh',
      chapterId: 'quadratic',
      title: '瑞利商',
      label: '应用',
      tex: r`R_A(\mathbf{x})=\frac{\mathbf{x}^{\mathrm T}A\mathbf{x}}
      {\mathbf{x}^{\mathrm T}\mathbf{x}},\qquad
      \lambda_{\min}\le R_A(\mathbf{x})\le\lambda_{\max}`,
      description: '瑞利商的取值范围由最小、最大特征值界定，极值在对应特征向量处取得。',
      condition: 'A 为实对称矩阵，x≠0',
      tags: ['二次型', '瑞利商', '特征值']
    },

    /* ---------------- 线性空间 ---------------- */
    {
      id: 'space-dimension',
      chapterId: 'spaces',
      title: '维数公式',
      label: '定理',
      tex: r`\dim(U+W)=\dim U+\dim W-\dim(U\cap W)`,
      description: '子空间和的维数等于维数之和减去交的维数；若交为零，则为直和。',
      condition: 'U、W 为有限维线性空间 V 的子空间',
      tags: ['线性空间', '子空间', '维数']
    },
    {
      id: 'space-transition',
      chapterId: 'spaces',
      title: '过渡矩阵',
      label: '定义',
      tex: r`(\boldsymbol{\eta}_1,\dots,\boldsymbol{\eta}_n)
      =(\boldsymbol{\varepsilon}_1,\dots,\boldsymbol{\varepsilon}_n)P`,
      description: 'P 的第 j 列是新基第 j 个向量在旧基下的坐标。',
      condition: '两组基均为 n 维空间的有序基',
      tags: ['线性空间', '基变换', '过渡矩阵']
    },
    {
      id: 'space-coordinate',
      chapterId: 'spaces',
      title: '坐标变换',
      label: '核心',
      tex: r`\mathbf{x}=P\mathbf{y},\qquad
      \mathbf{y}=P^{-1}\mathbf{x}`,
      description: 'x 为旧坐标，y 为新坐标；过渡矩阵把新坐标变成旧坐标。',
      condition: 'P 为从旧基到新基的过渡矩阵',
      tags: ['线性空间', '坐标变换', '基变换']
    },
    {
      id: 'space-rank-nullity',
      chapterId: 'spaces',
      title: '秩-零化度定理',
      label: '定理',
      tex: r`\dim V=\dim\ker T+\dim\operatorname{Im}T`,
      description: '输入空间的维数等于核空间维数加上像空间维数。',
      condition: 'V 为有限维线性空间，T:V→W 为线性变换',
      tags: ['线性变换', '核', '像', '秩']
    },
    {
      id: 'space-similarity',
      chapterId: 'spaces',
      title: '同一变换在不同基下的矩阵',
      label: '联系',
      tex: r`B=P^{-1}AP`,
      description: '相似矩阵描述同一个线性变换在不同基下的矩阵表示。',
      condition: 'P 为两组基之间的过渡矩阵',
      tags: ['线性变换', '相似', '基变换']
    }
  ];

  window.LA_CHAPTER_MAP = {};
  window.LA_CHAPTERS.forEach(function (chapter) {
    window.LA_CHAPTER_MAP[chapter.id] = chapter;
  });
})();
