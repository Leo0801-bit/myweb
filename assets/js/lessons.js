/* 线代 · 研学室 — 课程内容
   所有课程正文都使用 String.raw，确保 LaTeX 反斜杠原样保留。 */
(function () {
  const r = String.raw;

  window.LA_CHAPTERS = [
    {
      id: 'determinants',
      number: '01',
      title: '行列式',
      en: 'Determinants',
      icon: 'determinant',
      tone: 'blue',
      level: '基础',
      hours: 4,
      tagline: '一个方阵，被压缩成一个数',
      description: '从二阶、三阶行列式出发，理解逆序数定义、行列式性质、余子式展开与克拉默法则，并看见行列式背后的面积与体积。',
      sections: [
        {
          id: 'det-first-look',
          title: '从二阶、三阶行列式说起',
          minutes: 10,
          summary: '用对角线记忆法建立第一印象，并理解行列式的符号与几何含义。',
          html: r`
            <p>行列式是线性代数里第一个把<strong>方阵</strong>与<strong>数</strong>联系起来的工具。它既可以看作一种计算规则，也可以看成一个几何量：二阶行列式的绝对值是平行四边形面积，三阶行列式的绝对值是平行六面体体积。符号则记录着这组向量是否发生了“翻转”。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>二阶行列式</h4>
              <p>由四个数排成两行两列，记作
              \[
                \begin{vmatrix} a & b \\ c & d \end{vmatrix}=ad-bc.
              \]
              右端是一个数，而不是矩阵。计算口诀是“主对角线之积减去副对角线之积”。</p>
            </div>
            <p>三阶行列式可以先用<strong>对角线法则</strong>快速展开：</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">三阶行列式 · 对角线法则</span></div>
              <div class="math-display">
              \[
              \begin{vmatrix}
              a_{11} & a_{12} & a_{13}\\
              a_{21} & a_{22} & a_{23}\\
              a_{31} & a_{32} & a_{33}
              \end{vmatrix}
              =a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32}
              -a_{13}a_{22}a_{31}-a_{11}a_{23}a_{32}-a_{12}a_{21}a_{33}.
              \]
              </div>
              <p class="formula-block-note">把前两列抄在右侧，三条“右下斜线”取正号，三条“左下斜线”取负号。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>基础 · 计算</span></div>
              <div class="example-body">
                <div class="example-problem">计算
                  \(\begin{vmatrix} 2 & 1 & 0 \\ -1 & 3 & 1 \\ 1 & 0 & 2 \end{vmatrix}\)。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>按第一行展开：\(2\begin{vmatrix}3&1\\0&2\end{vmatrix}-1\begin{vmatrix}-1&1\\1&2\end{vmatrix}+0\)。</li>
                  <li>分别计算两个二阶行列式：\(2\times 6-1\times(-3)\)。</li>
                  <li>得到 \(12+3=15\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>行列式的值为 \(15\)。</div>
              </div>
            </div>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>对角线法则只适用于二、三阶</h4><p>四阶及以上行列式没有“继续画斜线”的规则。高阶行列式必须回到定义、性质或按行（列）展开来计算。</p></div>
            </div>
            <p>从几何角度看，把矩阵的两列当作平面向量 \(\mathbf{u},\mathbf{v}\)，则 \(|\det(\mathbf{u},\mathbf{v})|\) 就是它们张成的平行四边形面积；当 \(\det=0\) 时，两个向量共线，平行四边形退化成一条线段，面积为零。</p>
          `
        },
        {
          id: 'det-permutation',
          title: '全排列、逆序数与 n 阶行列式',
          minutes: 12,
          summary: '看清行列式定义中“n! 项求和”的结构，以及符号 \((-1)^{\tau}\) 从哪里来。',
          html: r`
            <p>把 \(1,2,\dots,n\) 重新排成 \(p_1p_2\cdots p_n\)，叫作一个<strong>n 级排列</strong>。在一个排列中，若较大的数排在较小的数前面，就称它们构成一个<strong>逆序</strong>；逆序的总数记作 \(\tau(p_1p_2\cdots p_n)\)。排列的奇偶性由逆序数决定。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>n 阶行列式</h4>
              <p>设 \(A=(a_{ij})_{n\times n}\)，则
              \[
                \det A=\sum_{p_1p_2\cdots p_n}(-1)^{\tau(p_1p_2\cdots p_n)}
                a_{1p_1}a_{2p_2}\cdots a_{np_n},
              \]
              其中求和遍历所有 \(n!\) 个 \(n\) 级排列。每一项从每一行、每一列各取一个元素相乘，符号由列排列的逆序数决定。</p>
            </div>
            <p>定义看起来抽象，但它精确说明了两件事：第一，行列式对每一行、每一列都“各取一个”；第二，每一项的符号由所选列的顺序决定。低阶行列式的对角线法则，正是这个定义在 \(n=2,3\) 时的展开结果。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>概念 · 逆序数</span></div>
              <div class="example-body">
                <div class="example-problem">判断排列 \(3\,1\,2\) 的奇偶性，并写出它在三阶行列式定义中对应的项。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>数对 \((3,1)\)、\((3,2)\) 都是逆序，而 \((1,2)\) 不是，所以 \(\tau(312)=2\)，是偶排列。</li>
                  <li>符号为 \((-1)^2=+1\)。</li>
                  <li>对应项为 \(+a_{13}a_{21}a_{32}\)。</li>
                </ol>
                <div class="example-answer"><strong>结论</strong>偶排列取正号，奇排列取负号。</div>
              </div>
            </div>
            <p>由定义可以直接读出两个基本事实：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>转置不改变行列式</strong><p>行与列的地位对称，所以 \(\det(A^{\mathrm T})=\det A\)。</p></div>
              <div class="concept-tile"><strong>含零行则行列式为零</strong><p>每一项都要从零行取一个元素，所有项都变成零。</p></div>
            </div>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>定义的意义：存在性与性质</h4><p>\(n!\) 项求和并不适合手算，但它给出了行列式的严格定义，也是证明性质、推导展开定理的出发点。实际计算请优先使用性质与展开。</p></div>
            </div>
          `
        },
        {
          id: 'det-properties',
          title: '行列式的性质与化三角形法',
          minutes: 13,
          summary: '用行变换把行列式化简，避免陷入定义与展开的重复计算。',
          html: r`
            <p>行列式的性质是计算的“快捷键”。核心思想是：<strong>尽量把行列式化成上三角或下三角</strong>，此时行列式等于对角线元素之积。</p>
            <table class="math-table">
              <thead><tr><th>性质</th><th>数学表达</th><th>使用提醒</th></tr></thead>
              <tbody>
                <tr><td>转置不变</td><td>\(\det(A^{\mathrm T})=\det A\)</td><td>行与列可以互换使用</td></tr>
                <tr><td>互换两行变号</td><td>\(r_i\leftrightarrow r_j\Rightarrow \det\mapsto-\det\)</td><td>每交换一次，记住添一个负号</td></tr>
                <tr><td>数乘一行</td><td>\(k r_i\Rightarrow \det\mapsto k\det A\)</td><td>提公因式只能从<strong>一行</strong>提</td></tr>
                <tr><td>行可加分解</td><td>某行拆成两行之和，行列式拆成两个行列式之和</td><td>其余各行保持不变</td></tr>
                <tr><td>两行相同或成比例</td><td>\(\det A=0\)</td><td>出现零行也立即为零</td></tr>
                <tr><td>倍加不变</td><td>\(r_i+k r_j\Rightarrow \det A\) 不变</td><td>最常用的化简操作</td></tr>
              </tbody>
            </table>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">重要区分</span></div>
              <div class="math-display">
                \[
                  \det(kA)=k^n\det A,\qquad
                  \det(A+B)\ne \det A+\det B\quad(\text{一般情形}).
                \]
              </div>
              <p class="formula-block-note">\(kA\) 表示矩阵的每一个元素都乘以 \(k\)，所以 \(n\) 行各提出一个 \(k\)。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>计算 · 化三角形</span></div>
              <div class="example-body">
                <div class="example-problem">计算
                  \(\begin{vmatrix}1&2&3\\2&5&7\\3&7&9\end{vmatrix}\)。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>用第一行消去第一列下方元素：\(r_2-2r_1,\ r_3-3r_1\)。</li>
                  <li>行列式变为
                    \(\begin{vmatrix}1&2&3\\0&1&1\\0&1&0\end{vmatrix}\)。</li>
                  <li>再用第二行消去第三行：\(r_3-r_2\)，得到
                    \(\begin{vmatrix}1&2&3\\0&1&1\\0&0&-1\end{vmatrix}\)。</li>
                  <li>上三角行列式等于对角线乘积：\(1\cdot1\cdot(-1)=-1\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(-1\)</div>
              </div>
            </div>
            <ul>
              <li><strong>先观察再动手：</strong>是否有零行、零列、相同行、成比例行？有则直接得零。</li>
              <li><strong>制造零：</strong>选一个含 \(1\) 或 \(-1\) 的位置作主元，用倍加变换消去同列其他元素。</li>
              <li><strong>记录符号：</strong>交换行要变号，数乘一行要保留倍率，这些都不能在最后“凭感觉”补回。</li>
            </ul>
          `
        },
        {
          id: 'det-expansion',
          title: '按行（列）展开：余子式与代数余子式',
          minutes: 12,
          summary: '掌握拉普拉斯展开定理，学会先制造零再展开。',
          html: r`
            <p>当行列式中某一行（列）含有很多零时，按这一行展开会非常高效。为此先引入余子式与代数余子式。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>余子式与代数余子式</h4>
              <p>划去元素 \(a_{ij}\) 所在的第 \(i\) 行和第 \(j\) 列，剩下的 \(n-1\) 阶行列式称为 \(a_{ij}\) 的<strong>余子式</strong>，记作 \(M_{ij}\)。再带上符号，得到<strong>代数余子式</strong>
              \[
                A_{ij}=(-1)^{i+j}M_{ij}.
              \]
              符号呈棋盘状交错：\(\begin{smallmatrix}+&-&+&\cdots\\-&+&-&\cdots\\+&-&+&\cdots\end{smallmatrix}\)。</p>
            </div>
            <div class="theorem-card">
              <span class="block-label">Theorem · 展开定理</span>
              <h4>按第 i 行展开</h4>
              <p>\[
                \det A=a_{i1}A_{i1}+a_{i2}A_{i2}+\cdots+a_{in}A_{in}.
              \]
              按第 \(j\) 列展开也有同样的形式：
              \[
                \det A=a_{1j}A_{1j}+a_{2j}A_{2j}+\cdots+a_{nj}A_{nj}.
              \]</p>
            </div>
            <p>还有一个经常被忽略的“异行异列”性质：某一行元素与<strong>另一行</strong>对应元素的代数余子式相乘并求和，结果恒为零：
              \[
                \sum_{k=1}^n a_{ik}A_{jk}=0\quad(i\ne j).
              \]
              这说明代数余子式矩阵与 \(A\) 相乘会得到数量矩阵，是伴随矩阵求逆的关键。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>展开 · 降阶</span></div>
              <div class="example-body">
                <div class="example-problem">计算
                  \(D=\begin{vmatrix}2&0&0&1\\0&3&0&0\\0&0&4&0\\1&0&0&5\end{vmatrix}\)。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>第二行只有一个非零元 \(a_{22}=3\)，按第二行展开：\(D=3(-1)^{2+2}M_{22}\)。</li>
                  <li>划去第二行第二列，得到三阶行列式 \(\begin{vmatrix}2&0&1\\0&4&0\\1&0&5\end{vmatrix}\)。</li>
                  <li>再按第二行展开：\(4\cdot\begin{vmatrix}2&1\\1&5\end{vmatrix}=4(10-1)=36\)。</li>
                  <li>所以 \(D=3\times36=108\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(108\)</div>
              </div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>计算策略</h4><p>先用倍加变换把某一行（列）化成只有一个非零元，再按这一行（列）展开。这样通常比直接展开更不容易出错。</p></div>
            </div>
          `
        },
        {
          id: 'det-special',
          title: '特殊行列式与常用计算模型',
          minutes: 11,
          summary: '记住三角、分块、范德蒙德等结构，遇到特殊形式直接识别。',
          html: r`
            <p>很多行列式有固定结构。认出结构，就能跳过大量机械展开。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">结构一 · 三角与对角</span></div>
              <div class="math-display">
                \[
                  \begin{vmatrix}
                  a_{11}&a_{12}&\cdots&a_{1n}\\
                  0&a_{22}&\cdots&a_{2n}\\
                  \vdots&\vdots&\ddots&\vdots\\
                  0&0&\cdots&a_{nn}
                  \end{vmatrix}
                  =a_{11}a_{22}\cdots a_{nn}.
                \]
              </div>
              <p class="formula-block-note">上三角、下三角、对角行列式都等于主对角线元素之积。</p>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">结构二 · 范德蒙德行列式</span></div>
              <div class="math-display">
                \[
                  V_n(x_1,\dots,x_n)=
                  \begin{vmatrix}
                  1&1&\cdots&1\\
                  x_1&x_2&\cdots&x_n\\
                  x_1^2&x_2^2&\cdots&x_n^2\\
                  \vdots&\vdots&&\vdots\\
                  x_1^{n-1}&x_2^{n-1}&\cdots&x_n^{n-1}
                  \end{vmatrix}
                  =\prod_{1\le i<j\le n}(x_j-x_i).
                \]
              </div>
              <p class="formula-block-note">当且仅当 \(x_1,\dots,x_n\) 互不相同时，范德蒙德行列式非零。</p>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">结构三 · 分块三角</span></div>
              <div class="math-display">
                \[
                  \begin{vmatrix} A & C \\ 0 & B \end{vmatrix}
                  =\begin{vmatrix} A & 0 \\ C & B \end{vmatrix}
                  =\det A\cdot\det B.
                \]
              </div>
              <p class="formula-block-note">其中 \(A,B\) 为方阵，分块交叉项可以是非零矩阵；但若两个对角块不是方阵，结论不能这样直接写。</p>
            </div>
            <p>还有一类常见模型是“每行元素之和相等”。若 \(A\) 的每一行元素之和都等于 \(s\)，则把各列加到第一列，第一列会变成 \(s\) 的倍数，从而可以提出公因子 \(s\)。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 05</span><span>范德蒙德 · 识别</span></div>
              <div class="example-body">
                <div class="example-problem">计算 \(D=\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}\)。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>三列分别是 \(x=1,2,3\) 的零次、一次、二次幂，符合范德蒙德结构。</li>
                  <li>使用公式：\((2-1)(3-1)(3-2)\)。</li>
                  <li>得到 \(1\times2\times1=2\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(2\)</div>
              </div>
            </div>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>注意列的顺序</h4><p>范德蒙德公式的差式方向与列的顺序有关。交换两列会使行列式变号，套公式前先确认列是按 \(x_1,x_2,\dots\) 还是反序排列。</p></div>
            </div>
          `
        },
        {
          id: 'det-cramer',
          title: '克拉默法则与行列式的几何意义',
          minutes: 12,
          summary: '用行列式判断方程组解的结构，并从面积、体积与定向理解它。',
          html: r`
            <p>行列式不仅用于计算，也能判断方阵是否可逆，从而判断线性方程组是否有唯一解。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 克拉默法则</span>
              <h4>n 个方程、n 个未知量</h4>
              <p>设 \(A\) 为 \(n\) 阶方阵，线性方程组 \(A\mathbf{x}=\mathbf{b}\) 的系数行列式 \(D=\det A\ne0\)，则方程组有唯一解
              \[
                x_1=\frac{D_1}{D},\quad x_2=\frac{D_2}{D},\quad\dots,\quad x_n=\frac{D_n}{D},
              \]
              其中 \(D_j\) 是把 \(A\) 的第 \(j\) 列替换为常数列 \(\mathbf{b}\) 后得到的行列式。</p>
            </div>
            <p>特别地，对于齐次方程组 \(A\mathbf{x}=\mathbf{0}\)：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>\(\det A\ne0\)</strong><p>只有零解。系数矩阵可逆，列向量线性无关。</p></div>
              <div class="concept-tile"><strong>\(\det A=0\)</strong><p>存在非零解。系数矩阵不可逆，列向量线性相关。</p></div>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 06</span><span>克拉默法则</span></div>
              <div class="example-body">
                <div class="example-problem">解方程组
                  \(\begin{cases}2x+y=5,\\ x+3y=10.\end{cases}\)
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\(D=\begin{vmatrix}2&1\\1&3\end{vmatrix}=5\)。</li>
                  <li>\(D_1=\begin{vmatrix}5&1\\10&3\end{vmatrix}=15-10=5\)，所以 \(x=1\)。</li>
                  <li>\(D_2=\begin{vmatrix}2&5\\1&10\end{vmatrix}=20-5=15\)，所以 \(y=3\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\((x,y)=(1,3)\)</div>
              </div>
            </div>
            <p>从几何上看，二阶行列式是有向面积，三阶行列式是有向体积。更一般地，线性变换 \(\mathbf{x}\mapsto A\mathbf{x}\) 会把任意区域的体积放大 \(|\det A|\) 倍；符号则表示定向是否被翻转。当 \(\det A=0\) 时，变换把空间压到更低维，体积为零，矩阵也就不可能可逆。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>理论价值大于计算价值</h4><p>克拉默法则形式优美，但计算 \(n+1\) 个行列式的代价很高。实际解方程组应使用高斯消元；克拉默法则更适合讨论解的存在性、唯一性与参数关系。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'matrices',
      number: '02',
      title: '矩阵',
      en: 'Matrices',
      icon: 'matrix',
      tone: 'teal',
      level: '基础',
      hours: 6,
      tagline: '线性变换的运算语言',
      description: '从矩阵运算到逆矩阵、初等变换与矩阵的秩，建立处理线性关系最核心的计算框架。',
      sections: [
        {
          id: 'mat-basics',
          title: '矩阵的概念与特殊矩阵',
          minutes: 9,
          summary: '认识矩阵的记号、形状与几类高频特殊矩阵。',
          html: r`
            <p>由 \(m\times n\) 个数排成的矩形阵列称为 \(m\times n\) 矩阵：
              \[
                A=\begin{pmatrix}
                a_{11}&a_{12}&\cdots&a_{1n}\\
                a_{21}&a_{22}&\cdots&a_{2n}\\
                \vdots&\vdots&&\vdots\\
                a_{m1}&a_{m2}&\cdots&a_{mn}
                \end{pmatrix}.
              \]
              矩阵不是数，不能随便“约掉”；它表示一组线性关系，或一个线性变换。</p>
            <table class="math-table">
              <thead><tr><th>名称</th><th>特征</th><th>常见用途</th></tr></thead>
              <tbody>
                <tr><td>零矩阵 \(O\)</td><td>所有元素为零</td><td>加法单位元</td></tr>
                <tr><td>单位矩阵 \(E\) 或 \(I\)</td><td>主对角线为 1，其余为 0</td><td>乘法单位元</td></tr>
                <tr><td>对角矩阵</td><td>非对角元全为零</td><td>逐坐标缩放</td></tr>
                <tr><td>三角矩阵</td><td>对角线一侧全为零</td><td>行列式、回代求解</td></tr>
                <tr><td>对称矩阵</td><td>\(A^{\mathrm T}=A\)</td><td>二次型、正交对角化</td></tr>
                <tr><td>反对称矩阵</td><td>\(A^{\mathrm T}=-A\)</td><td>旋转、李代数</td></tr>
                <tr><td>正交矩阵</td><td>\(Q^{\mathrm T}Q=QQ^{\mathrm T}=I\)</td><td>保长度、保角度的变换</td></tr>
              </tbody>
            </table>
            <p><strong>同型矩阵</strong>指行数与列数都相同。只有同型矩阵才能相加；也只有当左矩阵的列数等于右矩阵的行数时，乘法才有定义。</p>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>矩阵相等</h4><p>两个矩阵相等，必须同型，且对应位置的每一个元素都相等。仅“形状相同”或“行列式相等”都不够。</p></div>
            </div>
            <p>方阵的行列式、迹、秩、特征值等概念只对方阵有意义；但矩阵的秩、行最简形等概念对任意 \(m\times n\) 矩阵都有意义。</p>
          `
        },
        {
          id: 'mat-operations',
          title: '矩阵的线性运算与乘法',
          minutes: 13,
          summary: '理解“行乘列”的乘法规则、不可交换性以及转置的运算规律。',
          html: r`
            <p>矩阵加法与数乘都按元素进行。真正需要适应的是矩阵乘法：若 \(A=(a_{ij})_{m\times s}\)，\(B=(b_{ij})_{s\times n}\)，则 \(AB\) 是 \(m\times n\) 矩阵，其第 \(i\) 行第 \(j\) 列为</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">矩阵乘法 · 行乘列</span></div>
              <div class="math-display">
                \[
                  (AB)_{ij}=\sum_{k=1}^{s}a_{ik}b_{kj}
                  =a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{is}b_{sj}.
                \]
              </div>
              <p class="formula-block-note">左矩阵的第 \(i\) 行与右矩阵的第 \(j\) 列逐项相乘再相加。</p>
            </div>
            <p>矩阵乘法满足结合律与分配律，但一般不满足交换律：\(AB\) 与 \(BA\) 可能不相等，甚至可能一个有意义、另一个没有意义。它也不满足消去律：由 \(AB=AC\) 且 \(A\ne O\)，不能推出 \(B=C\)。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>乘法 · 不可交换</span></div>
              <div class="example-body">
                <div class="example-problem">取 \(A=\begin{pmatrix}1&1\\0&1\end{pmatrix}\)，\(B=\begin{pmatrix}1&0\\1&1\end{pmatrix}\)，比较 \(AB\) 与 \(BA\)。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\(AB=\begin{pmatrix}1&1\\0&1\end{pmatrix}\begin{pmatrix}1&0\\1&1\end{pmatrix}=\begin{pmatrix}2&1\\1&1\end{pmatrix}\)。</li>
                  <li>\(BA=\begin{pmatrix}1&0\\1&1\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix}=\begin{pmatrix}1&1\\1&2\end{pmatrix}\)。</li>
                  <li>两者不相等，说明矩阵乘法一般不可交换。</li>
                </ol>
                <div class="example-answer"><strong>结论</strong>不要随意交换相乘的顺序。</div>
              </div>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">转置的运算规律</span></div>
              <div class="math-display">
                \[
                  (A^{\mathrm T})^{\mathrm T}=A,\quad
                  (A+B)^{\mathrm T}=A^{\mathrm T}+B^{\mathrm T},\quad
                  (kA)^{\mathrm T}=kA^{\mathrm T},\quad
                  (AB)^{\mathrm T}=B^{\mathrm T}A^{\mathrm T}.
                \]
              </div>
              <p class="formula-block-note">乘积转置时，顺序必须反过来。多个矩阵相乘时同理：\((ABC)^{\mathrm T}=C^{\mathrm T}B^{\mathrm T}A^{\mathrm T}\)。</p>
            </div>
            <p>方阵的幂 \(A^k\) 表示 \(k\) 个 \(A\) 相乘。注意 \((A+B)^2=A^2+AB+BA+B^2\)，只有当 \(A,B\) 可交换时才等于 \(A^2+2AB+B^2\)。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>三个常见陷阱</h4><p>① \(AB=O\) 不能推出 \(A=O\) 或 \(B=O\)；② \(AB=BA\) 不是普遍规律；③ \((AB)^k\ne A^kB^k\)（一般情形）。</p></div>
            </div>
          `
        },
        {
          id: 'mat-inverse',
          title: '逆矩阵与伴随矩阵',
          minutes: 14,
          summary: '掌握可逆的判定、二阶逆矩阵公式、伴随矩阵求逆与逆的运算性质。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>逆矩阵</h4>
              <p>设 \(A\) 为 \(n\) 阶方阵。若存在 \(n\) 阶方阵 \(B\)，使得
                \(AB=BA=I\)，则称 \(A\) 可逆，\(B\) 为 \(A\) 的逆矩阵，记作 \(A^{-1}\)。逆矩阵若存在则唯一。</p>
            </div>
            <p>方阵可逆的判定方式很多，它们彼此等价：</p>
            <ul>
              <li>存在 \(B\) 使 \(AB=I\)（此时 \(BA=I\) 自动成立）；</li>
              <li>\(\det A\ne0\)；</li>
              <li>\(A\) 的列（行）向量线性无关；</li>
              <li>齐次方程组 \(A\mathbf{x}=\mathbf{0}\) 只有零解；</li>
              <li>\(A\) 的特征值全不为零；</li>
              <li>\(A\) 可写成若干初等矩阵的乘积。</li>
            </ul>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">二阶逆矩阵 · 口诀</span></div>
              <div class="math-display">
                \[
                  A=\begin{pmatrix}a&b\\c&d\end{pmatrix},\quad
                  A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}
                  \quad(ad-bc\ne0).
                \]
              </div>
              <p class="formula-block-note">主对角线交换，副对角线变号，再除以行列式。</p>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">伴随矩阵求逆</span></div>
              <div class="math-display">
                \[
                  A^{-1}=\frac{1}{\det A}A^{*},\qquad
                  AA^{*}=A^{*}A=(\det A)I,
                \]
                其中 \(A^{*}=(A_{ji})_{n\times n}\)，即先求代数余子式矩阵再转置。
              </div>
              <p class="formula-block-note">伴随矩阵的每个元素是原矩阵对应位置的代数余子式，并按转置摆放。</p>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">逆的运算性质</span></div>
              <div class="math-display">
                \[
                  (A^{-1})^{-1}=A,\quad
                  (AB)^{-1}=B^{-1}A^{-1},\quad
                  (A^{\mathrm T})^{-1}=(A^{-1})^{\mathrm T},\quad
                  (kA)^{-1}=\frac1k A^{-1}\ (k\ne0).
                \]
              </div>
              <p class="formula-block-note">乘积求逆同样要反序；这与乘积转置的规律一致。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>伴随矩阵 · 求逆</span></div>
              <div class="example-body">
                <div class="example-problem">设 \(A=\begin{pmatrix}1&2\\3&4\end{pmatrix}\)，求 \(A^{-1}\)。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\(\det A=1\cdot4-2\cdot3=-2\ne0\)，所以可逆。</li>
                  <li>按二阶公式交换主对角线、副对角线变号：\(\begin{pmatrix}4&-2\\-3&1\end{pmatrix}\)。</li>
                  <li>除以 \(-2\)，得到 \(A^{-1}=\begin{pmatrix}-2&1\\1.5&-0.5\end{pmatrix}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(A^{-1}=\begin{pmatrix}-2&1\\\frac32&-\frac12\end{pmatrix}\)</div>
              </div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>验证比记忆更可靠</h4><p>求出逆矩阵后，快速验算 \(AA^{-1}=I\)。对于 \(3\) 阶及以上矩阵，伴随矩阵法的计算量很大，实际更常用初等行变换。</p></div>
            </div>
          `
        },
        {
          id: 'mat-elementary',
          title: '初等变换与初等矩阵',
          minutes: 12,
          summary: '用行变换求逆、解方程组，并理解初等矩阵与可逆性的联系。',
          html: r`
            <p>矩阵的初等行变换有三种：</p>
            <ol class="step-list">
              <li><strong>交换两行：</strong>\(r_i\leftrightarrow r_j\)。</li>
              <li><strong>用非零数乘某一行：</strong>\(r_i\leftarrow k r_i\ (k\ne0)\)。</li>
              <li><strong>把一行的倍数加到另一行：</strong>\(r_i\leftarrow r_i+k r_j\)。</li>
            </ol>
            <p>把同样的操作施加到单位矩阵 \(I\) 上，得到的矩阵称为<strong>初等矩阵</strong>。对 \(A\) 做一次初等行变换，等价于在 \(A\) 的左边乘上对应的初等矩阵；初等列变换则等价于右乘。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 求逆</span>
              <h4>\((A\mid I)\longrightarrow(I\mid A^{-1})\)</h4>
              <p>若 \(A\) 可逆，对增广矩阵 \((A\mid I)\) 只做初等行变换，把左半部分化成单位矩阵，右半部分就同时化成了 \(A^{-1}\)。若左半部分无法化成 \(I\)，则 \(A\) 不可逆。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>行变换 · 求逆</span></div>
              <div class="example-body">
                <div class="example-problem">用初等行变换求 \(A=\begin{pmatrix}1&1\\2&3\end{pmatrix}\) 的逆矩阵。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>写出 \((A\mid I)=\left(\begin{array}{cc|cc}1&1&1&0\\2&3&0&1\end{array}\right)\)。</li>
                  <li>\(r_2-2r_1\)，得 \(\left(\begin{array}{cc|cc}1&1&1&0\\0&1&-2&1\end{array}\right)\)。</li>
                  <li>\(r_1-r_2\)，得 \(\left(\begin{array}{cc|cc}1&0&3&-1\\0&1&-2&1\end{array}\right)\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(A^{-1}=\begin{pmatrix}3&-1\\-2&1\end{pmatrix}\)</div>
              </div>
            </div>
            <p>初等矩阵都是可逆的，且其逆仍是同类型的初等矩阵。因此，一个方阵可逆当且仅当它可以表示为有限个初等矩阵的乘积。这个结论把“可逆”“初等变换”“行列式非零”“满秩”联系在了一起。</p>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>行变换与列变换的区别</h4><p>解线性方程组只能做行变换，因为解由行的等式关系决定；求矩阵的等价标准形可以行列变换并用。初等行变换保持行空间，初等列变换保持列空间。</p></div>
            </div>
          `
        },
        {
          id: 'mat-rank',
          title: '矩阵的秩与等价标准形',
          minutes: 14,
          summary: '把矩阵化简成阶梯形，读出秩，并掌握秩的不等式与几何含义。',
          html: r`
            <p>矩阵的秩是它“真正携带的独立信息量”。把矩阵化为行阶梯形后，非零行的个数就是秩，记作 \(r(A)\) 或 \(\operatorname{rank}(A)\)。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>矩阵的秩</h4>
              <p>矩阵 \(A\) 中非零子式的最高阶数称为 \(A\) 的秩；等价地，\(A\) 的行阶梯形中非零行的个数，或 \(A\) 的行（列）向量组的极大无关组所含向量个数，都是秩。</p>
            </div>
            <p>因此，行秩等于列秩，也等于非零子式的最高阶数。这三件事从不同角度描述同一个量。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">秩的常用性质</span></div>
              <div class="math-display">
                \[
                  r(A)=r(A^{\mathrm T}),\qquad
                  r(A)\le\min(m,n),\qquad
                  r(kA)=r(A)\ (k\ne0),
                \]
                \[
                  r(AB)\le\min\{r(A),r(B)\},\qquad
                  r(A+B)\le r(A)+r(B).
                \]
              </div>
              <p class="formula-block-note">若 \(A\) 为 \(m\times n\) 且 \(r(A)=m\)，称 \(A\) 行满秩；若 \(r(A)=n\)，称 \(A\) 列满秩；若 \(r(A)=n\)，则 \(A\) 可逆。</p>
            </div>
            <div class="theorem-card">
              <span class="block-label">Theorem · 等价标准形</span>
              <h4>任何矩阵都等价于唯一的“单位块”</h4>
              <p>若 \(r(A)=r>0\)，则存在可逆矩阵 \(P,Q\)，使得
                \[
                  PAQ=\begin{pmatrix}I_r&O\\O&O\end{pmatrix}_{m\times n}.
                \]
                这个形式称为 \(A\) 的等价标准形。两个同型矩阵等价，当且仅当它们的秩相等。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>求秩</span></div>
              <div class="example-body">
                <div class="example-problem">求 \(A=\begin{pmatrix}1&2&3\\2&4&6\\1&1&1\end{pmatrix}\) 的秩。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>第二行等于第一行的 2 倍，\(r_2-2r_1\) 后变为零行。</li>
                  <li>再用 \(r_3-r_1\)，第一列消零后得到 \(\begin{pmatrix}1&2&3\\0&0&0\\0&-1&-2\end{pmatrix}\)。</li>
                  <li>非零行共有 2 行，因此 \(r(A)=2\)。也可以观察前两行成比例，而第一、三行不成比例。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(r(A)=2\)</div>
              </div>
            </div>
            <p>秩还有重要的不等式，例如 Sylvester 秩不等式：若 \(A\) 为 \(m\times n\)，\(B\) 为 \(n\times s\)，则
              \[
                r(A)+r(B)-n\le r(AB)\le\min\{r(A),r(B)\}.
              \]
              当 \(AB=O\) 时，\(r(A)+r(B)\le n\)。这些不等式在证明与选择题中非常高频。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>不是所有运算都保秩</h4><p>乘一个可逆矩阵不改变秩；但一般的矩阵加法、乘法都可能降秩。例如两个满秩矩阵相乘，结果可能不是满秩。</p></div>
            </div>
          `
        },
        {
          id: 'mat-block',
          title: '分块矩阵与常用分块技巧',
          minutes: 11,
          summary: '把大矩阵拆成小块，利用块运算和块三角结构简化计算。',
          html: r`
            <p>当矩阵规模较大或具有重复结构时，可以按行、列把它切成若干小块，把每个小块当作“元素”参与运算。这就是<strong>分块矩阵</strong>。</p>
            <p>分块矩阵的加法要求对应块同型；分块乘法要求左矩阵列的分法与右矩阵行的分法一致。若
              \[
                A=\begin{pmatrix}A_{11}&A_{12}\\A_{21}&A_{22}\end{pmatrix},\quad
                B=\begin{pmatrix}B_{11}&B_{12}\\B_{21}&B_{22}\end{pmatrix},
              \]
              且各块尺寸匹配，则
              \[
                AB=\begin{pmatrix}
                A_{11}B_{11}+A_{12}B_{21}&A_{11}B_{12}+A_{12}B_{22}\\
                A_{21}B_{11}+A_{22}B_{21}&A_{21}B_{12}+A_{22}B_{22}
                \end{pmatrix}.
              \]
              形式上与普通矩阵乘法完全一致，但块与块之间不能交换顺序。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">分块对角与分块三角</span></div>
              <div class="math-display">
                \[
                  \begin{pmatrix}A&O\\O&B\end{pmatrix}^{-1}
                  =\begin{pmatrix}A^{-1}&O\\O&B^{-1}\end{pmatrix},
                  \qquad
                  \det\begin{pmatrix}A&C\\O&B\end{pmatrix}=\det A\cdot\det B.
                \]
              </div>
              <p class="formula-block-note">前提是 \(A,B\) 可逆（求逆式）或为方阵（行列式）。分块三角矩阵的行列式等于两个对角块行列式之积，与右上角 \(C\) 无关。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 05</span><span>分块对角 · 求逆</span></div>
              <div class="example-body">
                <div class="example-problem">设
                  \(M=\begin{pmatrix}1&2&0&0\\3&4&0&0\\0&0&2&0\\0&0&0&5\end{pmatrix}\)，求 \(M^{-1}\)。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>把 \(M\) 分成两个对角块 \(A=\begin{pmatrix}1&2\\3&4\end{pmatrix}\) 和 \(B=\begin{pmatrix}2&0\\0&5\end{pmatrix}\)。</li>
                  <li>\(A^{-1}=\frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix}=\begin{pmatrix}-2&1\\\frac32&-\frac12\end{pmatrix}\)。</li>
                  <li>\(B^{-1}=\begin{pmatrix}\frac12&0\\0&\frac15\end{pmatrix}\)，按分块位置拼回即可。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(M^{-1}=\begin{pmatrix}-2&1&0&0\\ \frac32&-\frac12&0&0\\0&0&\frac12&0\\0&0&0&\frac15\end{pmatrix}\)</div>
              </div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>分块的目的</h4><p>一是利用零块减少计算，二是把高阶矩阵拆成低阶问题，三是揭示矩阵的结构。考试中常见的“箭头形”“爪形”行列式，往往可以通过分块或消元处理。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'vectors',
      number: '03',
      title: '向量组',
      en: 'Vector Spaces',
      icon: 'vector',
      tone: 'gold',
      level: '基础',
      hours: 5,
      tagline: '相关与无关，是维度的分水岭',
      description: '理解线性组合、线性相关、极大无关组与秩，并学会用内积和正交化度量向量。',
      sections: [
        {
          id: 'vec-combination',
          title: 'n 维向量与线性组合',
          minutes: 9,
          summary: '把向量看作坐标、箭头与数据，理解线性表示与生成空间。',
          html: r`
            <p>\(n\) 个实数组成的有序数组
              \(\boldsymbol{\alpha}=(a_1,a_2,\dots,a_n)^{\mathrm T}\)
              称为 \(n\) 维列向量。向量的加法与数乘按分量进行，这使向量集合拥有了线性结构。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>线性组合与线性表示</h4>
              <p>设 \(\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s\) 是一组向量。若存在数 \(k_1,\dots,k_s\)，使得
                \[
                  \boldsymbol{\beta}=k_1\boldsymbol{\alpha}_1+k_2\boldsymbol{\alpha}_2+\cdots+k_s\boldsymbol{\alpha}_s,
                \]
                则称 \(\boldsymbol{\beta}\) 是这组向量的<strong>线性组合</strong>，或称 \(\boldsymbol{\beta}\) 可由它们<strong>线性表示</strong>。</p>
            </div>
            <p>所有可能的线性组合构成的集合称为这组向量<strong>张成</strong>的空间，记作
              \(\operatorname{span}\{\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s\}\)。
              线性表示问题本质上就是解线性方程组：把系数作为未知量，把向量按列排成矩阵。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>线性表示</span></div>
              <div class="example-body">
                <div class="example-problem">判断 \(\boldsymbol{\beta}=(3,5)^{\mathrm T}\) 能否由
                  \(\boldsymbol{\alpha}_1=(1,1)^{\mathrm T}\)，\(\boldsymbol{\alpha}_2=(1,2)^{\mathrm T}\) 线性表示。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>设 \(x\boldsymbol{\alpha}_1+y\boldsymbol{\alpha}_2=\boldsymbol{\beta}\)，得到方程组
                    \(\begin{cases}x+y=3,\\ x+2y=5.\end{cases}\)</li>
                  <li>两式相减得 \(y=2\)，再得 \(x=1\)。</li>
                  <li>所以 \(\boldsymbol{\beta}=\boldsymbol{\alpha}_1+2\boldsymbol{\alpha}_2\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>可以表示，系数为 \((1,2)\)。</div>
              </div>
            </div>
            <p>几何上，两个不共线的二维向量张成整个平面；若它们共线，则只能张成一条直线。三维中，两个不共线的向量张成一个平面，三个不共面的向量张成整个空间。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>表示系数是否唯一？</h4><p>若生成向量组线性无关，表示系数唯一；若线性相关，表示方式可能不唯一。这个问题会在下一节得到完整回答。</p></div>
            </div>
          `
        },
        {
          id: 'vec-dependence',
          title: '线性相关与线性无关',
          minutes: 15,
          summary: '掌握定义、矩阵秩判别法，以及相关性与维数之间的直觉。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>线性相关 / 线性无关</h4>
              <p>若存在<strong>不全为零</strong>的数 \(k_1,\dots,k_s\)，使得
                \[
                  k_1\boldsymbol{\alpha}_1+\cdots+k_s\boldsymbol{\alpha}_s=\mathbf{0},
                \]
                则称向量组线性相关；若上式只有在 \(k_1=\cdots=k_s=0\) 时才成立，则称向量组线性无关。</p>
            </div>
            <p>直观地说，线性相关意味着至少有一个向量是“多余的”，它可以由其余向量线性表示；线性无关意味着每个向量都提供了新的方向，谁也不能被别人表示。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 判别</span>
              <h4>把向量按列排成矩阵</h4>
              <p>设 \(A=(\boldsymbol{\alpha}_1,\dots,\boldsymbol{\alpha}_s)\)。则</p>
              <ul>
                <li>向量组线性相关 \(\iff r(A)&lt;s\)；</li>
                <li>向量组线性无关 \(\iff r(A)=s\)；</li>
                <li>当 \(s=n\)（方阵）时，线性无关 \(\iff \det A\ne0\)。</li>
              </ul>
              <p>齐次方程组 \(A\mathbf{x}=\mathbf{0}\) 有非零解 \(\iff\) 列向量组线性相关。这是贯穿全书的等价关系。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>判定相关性</span></div>
              <div class="example-body">
                <div class="example-problem">判断
                  \(\boldsymbol{\alpha}_1=(1,2,3)^{\mathrm T}\)，
                  \(\boldsymbol{\alpha}_2=(2,4,6)^{\mathrm T}\)，
                  \(\boldsymbol{\alpha}_3=(1,0,1)^{\mathrm T}\) 的线性相关性。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>显然 \(\boldsymbol{\alpha}_2=2\boldsymbol{\alpha}_1\)，存在非平凡关系。</li>
                  <li>直接写出 \(2\boldsymbol{\alpha}_1-\boldsymbol{\alpha}_2+0\boldsymbol{\alpha}_3=\mathbf{0}\)，系数不全为零。</li>
                  <li>因此向量组线性相关，且秩小于 3。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>线性相关。</div>
              </div>
            </div>
            <p>常用结论：</p>
            <ul>
              <li>含零向量的向量组必线性相关。</li>
              <li>若向量组线性无关，则它的任意非空子组也线性无关。</li>
              <li>若向量组线性相关，则添加向量后仍然线性相关。</li>
              <li>\(n+1\) 个 \(n\) 维向量必线性相关。</li>
              <li>两个向量线性相关 \(\iff\) 它们共线（成比例）。</li>
            </ul>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>“相关”不等于“任意两个成比例”</h4><p>三个及以上向量可能整体相关，但其中任意两个都不成比例。例如三个共面的三维向量，彼此可以都不共线，却整体线性相关。</p></div>
            </div>
          `
        },
        {
          id: 'vec-rank',
          title: '极大无关组与向量组的秩',
          minutes: 12,
          summary: '从一组向量中提炼出真正独立的信息，并计算它的秩。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>极大线性无关组</h4>
              <p>向量组的一个部分组若线性无关，且再添加原组中任意一个向量都会变成线性相关，则称它为原向量组的一个<strong>极大线性无关组</strong>。极大无关组所含向量的个数称为向量组的<strong>秩</strong>。</p>
            </div>
            <p>极大无关组不一定唯一，但它的向量个数是唯一的，等于向量组的秩。原向量组中的每个向量都可以由极大无关组唯一地线性表示。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 求法</span>
              <h4>列摆矩阵，化行最简形</h4>
              <p>把向量按列排成矩阵 \(A\)，做初等行变换化为行最简形。非零行所在的列对应原向量组的一个极大无关组；主元所在的列就是“保留下来”的独立方向。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>极大无关组</span></div>
              <div class="example-body">
                <div class="example-problem">求向量组
                  \(\boldsymbol{\alpha}_1=(1,2,1)^{\mathrm T}\)，
                  \(\boldsymbol{\alpha}_2=(2,4,2)^{\mathrm T}\)，
                  \(\boldsymbol{\alpha}_3=(1,3,2)^{\mathrm T}\) 的秩和一个极大无关组。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>按列排成矩阵并作行变换：
                    \(\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}\to
                    \begin{pmatrix}1&2&1\\0&0&1\\0&0&1\end{pmatrix}\to
                    \begin{pmatrix}1&2&0\\0&0&1\\0&0&0\end{pmatrix}\)。</li>
                  <li>主元位于第 1、3 列，所以 \(r=2\)。</li>
                  <li>对应的原向量 \(\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_3\) 构成极大无关组。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>秩为 \(2\)，\(\{\boldsymbol{\alpha}_1,\boldsymbol{\alpha}_3\}\) 是一个极大无关组。</div>
              </div>
            </div>
            <p>若两个向量组可以互相线性表示，则称它们<strong>等价</strong>。等价的向量组秩相等，且它们的极大无关组也等价。矩阵的初等行变换不改变列向量组的线性关系，因此可以放心地对列摆矩阵做行变换。</p>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>行变换还是列变换？</h4><p>求列向量组的极大无关组时，只能做行变换，因为列之间的线性关系必须保持不变；若做列变换，列本身会被换掉，对应关系也就变了。</p></div>
            </div>
          `
        },
        {
          id: 'vec-space',
          title: '向量空间、基与维数',
          minutes: 11,
          summary: '从“生成”走向“坐标系”，为线性空间与坐标变换打基础。',
          html: r`
            <p>一个非空向量集合若对加法与数乘封闭，就称为<strong>向量空间</strong>（或线性空间）。例如 \(\mathbb{R}^n\)、所有 \(m\times n\) 矩阵、次数不超过 \(n\) 的多项式，都构成向量空间。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>基与维数</h4>
              <p>向量空间 \(V\) 中的一组向量若满足：① 线性无关；② 能生成整个 \(V\)，则称为 \(V\) 的一组<strong>基</strong>。基所含向量的个数称为 \(V\) 的<strong>维数</strong>，记作 \(\dim V\)。</p>
            </div>
            <p>基的作用是给空间安装“坐标轴”。若 \(\boldsymbol{\varepsilon}_1,\dots,\boldsymbol{\varepsilon}_n\) 是 \(V\) 的一组基，则每个向量 \(\boldsymbol{\alpha}\) 都能唯一地写成</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">坐标表示</span></div>
              <div class="math-display">
                \[
                  \boldsymbol{\alpha}=x_1\boldsymbol{\varepsilon}_1+\cdots+x_n\boldsymbol{\varepsilon}_n,
                  \qquad
                  (\boldsymbol{\alpha})_{\mathcal{B}}=(x_1,\dots,x_n)^{\mathrm T}.
                \]
              </div>
              <p class="formula-block-note">同一向量在不同基下的坐标一般不同；基变换会带来坐标变换。</p>
            </div>
            <p>在 \(\mathbb{R}^n\) 中，自然基 \(\mathbf{e}_1,\dots,\mathbf{e}_n\) 使坐标就是我们熟悉的坐标。但基可以任意选择，例如 \(\mathbb{R}^2\) 中取 \((1,0)^{\mathrm T}\) 与 \((1,1)^{\mathrm T}\)，同一个点就会有新的坐标表示。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>坐标 · 换基</span></div>
              <div class="example-body">
                <div class="example-problem">在 \(\mathbb{R}^2\) 中，取基 \(\boldsymbol{\varepsilon}_1=(1,0)^{\mathrm T}\)，\(\boldsymbol{\varepsilon}_2=(1,1)^{\mathrm T}\)，求 \(\boldsymbol{\alpha}=(3,2)^{\mathrm T}\) 在这组基下的坐标。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>设 \(\boldsymbol{\alpha}=x\boldsymbol{\varepsilon}_1+y\boldsymbol{\varepsilon}_2=(x+y,y)^{\mathrm T}\)。</li>
                  <li>比较分量：\(y=2\)，\(x+y=3\)，所以 \(x=1\)。</li>
                  <li>坐标为 \((1,2)^{\mathrm T}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\((1,2)^{\mathrm T}\)</div>
              </div>
            </div>
            <p>同一个向量空间可以有无数组基，但维数固定。若 \(V\) 的维数为 \(n\)，则任意 \(n\) 个线性无关的向量都构成一组基；任意 \(n+1\) 个向量必线性相关。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>“坐标”是相对的</h4><p>坐标不是向量本身，而是向量相对于某组基的系数。选对基，复杂问题可能瞬间简化；这正是对角化与坐标变换的思想源头。</p></div>
            </div>
          `
        },
        {
          id: 'vec-orthogonal',
          title: '内积、正交与施密特正交化',
          minutes: 14,
          summary: '用长度、夹角和投影理解正交，掌握把一组基变成标准正交基的方法。',
          html: r`
            <p>在 \(\mathbb{R}^n\) 中，两个向量的内积定义为
              \[
                (\boldsymbol{\alpha},\boldsymbol{\beta})=\boldsymbol{\alpha}^{\mathrm T}\boldsymbol{\beta}
                =a_1b_1+\cdots+a_nb_n.
              \]
              由此得到长度 \(\|\boldsymbol{\alpha}\|=\sqrt{(\boldsymbol{\alpha},\boldsymbol{\alpha})}\)，以及夹角余弦
              \(\cos\theta=\dfrac{(\boldsymbol{\alpha},\boldsymbol{\beta})}{\|\boldsymbol{\alpha}\|\,\|\boldsymbol{\beta}\|}\)。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>正交与标准正交</h4>
              <p>若 \((\boldsymbol{\alpha},\boldsymbol{\beta})=0\)，称两向量<strong>正交</strong>。一组非零向量若两两正交，则它们线性无关；若每个向量的长度都为 1，则称为<strong>标准正交组</strong>。</p>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">施密特正交化</span></div>
              <div class="math-display">
                \[
                  \begin{aligned}
                  \boldsymbol{\beta}_1&=\boldsymbol{\alpha}_1,\\
                  \boldsymbol{\beta}_2&=\boldsymbol{\alpha}_2-\frac{(\boldsymbol{\alpha}_2,\boldsymbol{\beta}_1)}{(\boldsymbol{\beta}_1,\boldsymbol{\beta}_1)}\boldsymbol{\beta}_1,\\
                  \boldsymbol{\beta}_3&=\boldsymbol{\alpha}_3-\frac{(\boldsymbol{\alpha}_3,\boldsymbol{\beta}_1)}{(\boldsymbol{\beta}_1,\boldsymbol{\beta}_1)}\boldsymbol{\beta}_1
                  -\frac{(\boldsymbol{\alpha}_3,\boldsymbol{\beta}_2)}{(\boldsymbol{\beta}_2,\boldsymbol{\beta}_2)}\boldsymbol{\beta}_2.
                  \end{aligned}
                \]
              </div>
              <p class="formula-block-note">每一步都减去前面各向量上的投影，得到与它们都正交的新方向。最后再单位化：\(\mathbf{e}_i=\boldsymbol{\beta}_i/\|\boldsymbol{\beta}_i\|\)。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 05</span><span>正交化</span></div>
              <div class="example-body">
                <div class="example-problem">将 \(\boldsymbol{\alpha}_1=(1,1)^{\mathrm T}\)，\(\boldsymbol{\alpha}_2=(1,0)^{\mathrm T}\) 正交化。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\(\boldsymbol{\beta}_1=\boldsymbol{\alpha}_1=(1,1)^{\mathrm T}\)。</li>
                  <li>\((\boldsymbol{\alpha}_2,\boldsymbol{\beta}_1)=1\)，\((\boldsymbol{\beta}_1,\boldsymbol{\beta}_1)=2\)。</li>
                  <li>\(\boldsymbol{\beta}_2=(1,0)^{\mathrm T}-\frac12(1,1)^{\mathrm T}=(\frac12,-\frac12)^{\mathrm T}\)。</li>
                  <li>可成比例地取 \((1,-1)^{\mathrm T}\) 作为正交向量。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(\boldsymbol{\beta}_1=(1,1)^{\mathrm T}\)，\(\boldsymbol{\beta}_2=(1,-1)^{\mathrm T}\)（相差一个倍数）。</div>
              </div>
            </div>
            <p>若方阵 \(Q\) 的列向量构成标准正交组，则称 \(Q\) 为<strong>正交矩阵</strong>，满足 \(Q^{\mathrm T}Q=QQ^{\mathrm T}=I\)，即 \(Q^{-1}=Q^{\mathrm T}\)。左乘正交矩阵保持长度与内积，因此保持夹角和距离。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>正交化会改变张成空间吗？</h4><p>不会。施密特正交化每一步都是在前一步张成的同一空间中替换方向，所得向量组与原向量组等价，张成同一个子空间。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'systems',
      number: '04',
      title: '线性方程组',
      en: 'Linear Systems',
      icon: 'system',
      tone: 'terracotta',
      level: '核心',
      hours: 5,
      tagline: '解的结构，由秩决定',
      description: '用高斯消元与秩判定方程组解的存在性，理解基础解系、通解结构和解空间。',
      sections: [
        {
          id: 'sys-gaussian',
          title: '高斯消元与行最简形',
          minutes: 12,
          summary: '把方程组变成增广矩阵，用初等行变换一步步化简，直到可以直接读出解。',
          html: r`
            <p>线性方程组
              \[
                \begin{cases}
                a_{11}x_1+\cdots+a_{1n}x_n=b_1,\\
                \cdots\\
                a_{m1}x_1+\cdots+a_{mn}x_n=b_m
                \end{cases}
              \]
              可以紧凑地写成矩阵形式 \(A\mathbf{x}=\mathbf{b}\)。把系数矩阵与常数列拼在一起，得到<strong>增广矩阵</strong> \((A\mid\mathbf{b})\)。</p>
            <p>对增广矩阵做初等行变换，不改变方程组的解集。目标是把矩阵化为<strong>行阶梯形</strong>，进而化为<strong>行最简形</strong>：每个主元为 1，且主元所在列的其他元素都为 0。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>高斯消元</span></div>
              <div class="example-body">
                <div class="example-problem">解方程组
                  \(\begin{cases}x+y+z=6,\\ 2x-y+z=3,\\ x+2y-z=2.\end{cases}\)
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>写出增广矩阵并消元：
                    \(\left(\begin{array}{ccc|c}1&1&1&6\\2&-1&1&3\\1&2&-1&2\end{array}\right)
                    \to\left(\begin{array}{ccc|c}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{array}\right)\)。</li>
                  <li>交换第二、三行并化简，得到
                    \(\left(\begin{array}{ccc|c}1&1&1&6\\0&1&-2&-4\\0&0&-7&-21\end{array}\right)\)。</li>
                  <li>回代：\(z=3\)，\(y=-4+2z=2\)，\(x=6-y-z=1\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\((x,y,z)=(1,2,3)\)。</div>
              </div>
            </div>
            <p>行最简形是解方程组最“透明”的形式。主元列对应的变量称为<strong>主变量</strong>，其余变量称为<strong>自由变量</strong>。自由变量可以任意取值，这直接引出了通解的参数表示。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>只用行变换</h4><p>增广矩阵的列带有变量含义，列变换会改变变量对应关系，因此解方程组只能做初等行变换。尽量选简单的数作主元，并保持计算整洁。</p></div>
            </div>
          `
        },
        {
          id: 'sys-criteria',
          title: '解的判定：秩说了算',
          minutes: 12,
          summary: '用系数矩阵与增广矩阵的秩判断无解、唯一解还是无穷多解。',
          html: r`
            <p>线性方程组 \(A\mathbf{x}=\mathbf{b}\) 的解的情况，完全由 \(r(A)\) 与 \(r(A\mid\mathbf{b})\) 决定：</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">判定定理</span></div>
              <div class="math-display">
                \[
                  \begin{cases}
                  r(A)<r(A\mid\mathbf{b}) & \Longrightarrow \text{无解};\\[4pt]
                  r(A)=r(A\mid\mathbf{b})=n & \Longrightarrow \text{唯一解};\\[4pt]
                  r(A)=r(A\mid\mathbf{b})<n & \Longrightarrow \text{无穷多解}.
                  \end{cases}
                \]
              </div>
              <p class="formula-block-note">其中 \(n\) 是未知量的个数。直观理解：秩小于增广秩，说明出现了 \(0=d\ (d\ne0)\) 的矛盾行；秩等于未知量个数，说明没有自由变量。</p>
            </div>
            <p>对于齐次方程组 \(A\mathbf{x}=\mathbf{0}\)，永远有零解，因此只可能“只有零解”或“有非零解”：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>\(r(A)=n\)</strong><p>只有零解。列向量线性无关，\(A\) 列满秩。</p></div>
              <div class="concept-tile"><strong>\(r(A)&lt;n\)</strong><p>有非零解，且解空间维数为 \(n-r(A)\)。</p></div>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>参数讨论</span></div>
              <div class="example-body">
                <div class="example-problem">讨论 \(\lambda\) 取何值时，方程组
                  \(\begin{cases}\lambda x+y=1,\\ x+\lambda y=1\end{cases}\) 有唯一解、无解、无穷多解。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>系数行列式 \(D=\lambda^2-1=(\lambda-1)(\lambda+1)\)。</li>
                  <li>当 \(\lambda\ne\pm1\) 时，\(D\ne0\)，有唯一解。</li>
                  <li>当 \(\lambda=1\) 时，两个方程都是 \(x+y=1\)，有无穷多解。</li>
                  <li>当 \(\lambda=-1\) 时，方程为 \(-x+y=1\) 与 \(x-y=1\)，即 \(x-y=-1\) 与 \(x-y=1\)，矛盾，无解。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(\lambda\ne\pm1\) 唯一解；\(\lambda=1\) 无穷多解；\(\lambda=-1\) 无解。</div>
              </div>
            </div>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>几何图像</h4><p>两个未知量时，每个方程是一条直线：相交于一点（唯一解）、重合（无穷多解）、平行（无解）。三个未知量时，每个方程是一个平面，解集可能是点、直线、平面或空集。</p></div>
            </div>
          `
        },
        {
          id: 'sys-homogeneous',
          title: '齐次方程组与基础解系',
          minutes: 14,
          summary: '求零空间的一组基，理解解空间维数 n−r 的来源。',
          html: r`
            <p>齐次方程组 \(A\mathbf{x}=\mathbf{0}\) 的解集 \(N(A)=\{\mathbf{x}:A\mathbf{x}=\mathbf{0}\}\) 称为 \(A\) 的<strong>零空间</strong>，它对加法与数乘封闭，是一个向量空间。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 基础解系</span>
              <h4>解空间的维数</h4>
              <p>若 \(A\) 为 \(m\times n\) 矩阵，\(r(A)=r&lt;n\)，则齐次方程组有基础解系，且所含向量个数为
                \[
                  \dim N(A)=n-r.
                \]
                基础解系是解空间的一组基，通解是它们的任意线性组合。</p>
            </div>
            <p>求基础解系的步骤：</p>
            <ol class="step-list">
              <li><strong>化行最简形：</strong>对系数矩阵 \(A\) 作初等行变换。</li>
              <li><strong>确定自由变量：</strong>非主元列对应的未知量。</li>
              <li><strong>依次取单位值：</strong>令自由变量轮流取 1，其余取 0，解出主变量。</li>
              <li><strong>写出基础解系：</strong>每个自由变量对应一个解向量，它们线性无关且张成整个解空间。</li>
            </ol>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>基础解系</span></div>
              <div class="example-body">
                <div class="example-problem">求方程组
                  \(\begin{cases}x_1+2x_2-x_3+x_4=0,\\ 2x_1+4x_2-3x_3+2x_4=0\end{cases}\) 的基础解系。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>系数矩阵化为行最简形：
                    \(\begin{pmatrix}1&2&-1&1\\2&4&-3&2\end{pmatrix}\to
                    \begin{pmatrix}1&2&0&1\\0&0&-1&0\end{pmatrix}\to
                    \begin{pmatrix}1&2&0&1\\0&0&1&0\end{pmatrix}\)。</li>
                  <li>主元在第 1、3 列，\(x_2,x_4\) 为自由变量，\(r=2\)，解空间维数为 \(4-2=2\)。</li>
                  <li>令 \(x_2=1,x_4=0\)：由 \(x_1+2x_2+x_4=0\) 得 \(x_1=-2\)，得 \(\boldsymbol{\xi}_1=(-2,1,0,0)^{\mathrm T}\)。</li>
                  <li>令 \(x_2=0,x_4=1\)：得 \(x_1=-1\)，得 \(\boldsymbol{\xi}_2=(-1,0,0,1)^{\mathrm T}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>基础解系为 \(\boldsymbol{\xi}_1=(-2,1,0,0)^{\mathrm T}\)，\(\boldsymbol{\xi}_2=(-1,0,0,1)^{\mathrm T}\)。</div>
              </div>
            </div>
            <p>通解为 \(k_1\boldsymbol{\xi}_1+k_2\boldsymbol{\xi}_2\)，其中 \(k_1,k_2\) 为任意常数。基础解系不唯一，但所含向量个数唯一，等于 \(n-r\)。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>自由变量不是“随便选”</h4><p>自由变量必须对应非主元列。若选主元变量作自由变量，会导致表示重复或无法张成整个解空间。基础解系的向量数必须恰好为 \(n-r\)。</p></div>
            </div>
          `
        },
        {
          id: 'sys-general',
          title: '非齐次方程组的通解结构',
          minutes: 12,
          summary: '一个特解加上齐次通解，构成所有解；并掌握增广矩阵的解法。',
          html: r`
            <div class="theorem-card">
              <span class="block-label">Theorem · 解的结构</span>
              <h4>特解 + 齐次通解</h4>
              <p>设 \(A\mathbf{x}=\mathbf{b}\) 有解，\(\boldsymbol{\eta}_0\) 是它的一个特解，\(\boldsymbol{\xi}_1,\dots,\boldsymbol{\xi}_{n-r}\) 是齐次方程组 \(A\mathbf{x}=\mathbf{0}\) 的基础解系，则非齐次方程组的通解为
                \[
                  \mathbf{x}=\boldsymbol{\eta}_0+k_1\boldsymbol{\xi}_1+\cdots+k_{n-r}\boldsymbol{\xi}_{n-r},
                \]
                其中 \(k_i\) 为任意常数。</p>
            </div>
            <p>几何上，非齐次方程组的解集是零空间的一个<strong>平移</strong>：把过原点的解空间整体平移到特解 \(\boldsymbol{\eta}_0\) 处。它一般不过原点，因此不是向量空间，而是仿射空间。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>通解</span></div>
              <div class="example-body">
                <div class="example-problem">求方程组
                  \(\begin{cases}x_1+x_2+x_3=3,\\ x_1-x_2+2x_3=2\end{cases}\) 的通解。
                </div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>增广矩阵化为行最简形：
                    \(\left(\begin{array}{ccc|c}1&1&1&3\\1&-1&2&2\end{array}\right)\to
                    \left(\begin{array}{ccc|c}1&0&\frac32&\frac52\\0&1&-\frac12&\frac12\end{array}\right)\)。</li>
                  <li>\(r(A)=r(A\mid\mathbf{b})=2&lt;3\)，有无穷多解，自由变量为 \(x_3\)。</li>
                  <li>取 \(x_3=0\) 得特解 \(\boldsymbol{\eta}_0=(\frac52,\frac12,0)^{\mathrm T}\)。</li>
                  <li>齐次部分：\(x_1+\frac32x_3=0,\ x_2-\frac12x_3=0\)，取 \(x_3=2\) 得 \(\boldsymbol{\xi}=(-3,1,2)^{\mathrm T}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(\mathbf{x}=(\frac52,\frac12,0)^{\mathrm T}+k(-3,1,2)^{\mathrm T}\)，\(k\in\mathbb{R}\)。</div>
              </div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>取特解的小技巧</h4><p>令所有自由变量为 0，往往能得到最简单的特解。若这样导致主变量出现复杂分数，也可以给自由变量取其他方便的值，只要满足方程即可。</p></div>
            </div>
          `
        },
        {
          id: 'sys-space',
          title: '解空间、矩阵方程与总结',
          minutes: 10,
          summary: '把方程组放进矩阵语言，比较 AX=0 与 AX=B，形成整体图景。',
          html: r`
            <p>矩阵方程 \(AX=B\) 可以把 \(B\) 的每一列看作一个右端项，同时求解多个方程组。若 \(A\) 为 \(m\times n\)，\(X\) 为 \(n\times p\)，则 \(AX=B\) 有解当且仅当
              \[
                r(A)=r(A\mid B).
              \]
              若有解且 \(r(A)=n\)，则解矩阵 \(X\) 唯一；若 \(r(A)&lt;n\)，则有无穷多个解矩阵。</p>
            <table class="math-table">
              <thead><tr><th>对象</th><th>条件</th><th>结论</th></tr></thead>
              <tbody>
                <tr><td>\(A\mathbf{x}=\mathbf{0}\)</td><td>\(r(A)=n\)</td><td>只有零解，零空间 \(\{0\}\)</td></tr>
                <tr><td>\(A\mathbf{x}=\mathbf{0}\)</td><td>\(r(A)=r&lt;n\)</td><td>基础解系含 \(n-r\) 个向量</td></tr>
                <tr><td>\(A\mathbf{x}=\mathbf{b}\)</td><td>\(r(A)&lt;r(A\mid\mathbf{b})\)</td><td>无解</td></tr>
                <tr><td>\(A\mathbf{x}=\mathbf{b}\)</td><td>\(r(A)=r(A\mid\mathbf{b})=n\)</td><td>唯一解</td></tr>
                <tr><td>\(A\mathbf{x}=\mathbf{b}\)</td><td>\(r(A)=r(A\mid\mathbf{b})&lt;n\)</td><td>无穷多解，维数 \(n-r\)</td></tr>
              </tbody>
            </table>
            <p>线性方程组、矩阵的秩、向量组的线性相关性，本质上是同一件事的三种语言：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>方程语言</strong><p>\(A\mathbf{x}=\mathbf{0}\) 是否有非零解？</p></div>
              <div class="concept-tile"><strong>向量语言</strong><p>\(A\) 的列向量是否线性相关？</p></div>
              <div class="concept-tile"><strong>矩阵语言</strong><p>\(r(A)\) 是否小于列数 \(n\)？</p></div>
              <div class="concept-tile"><strong>变换语言</strong><p>线性映射 \(A\) 是否有非平凡的核？</p></div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>一张图记住解的结构</h4><p>齐次解集是过原点的子空间；非齐次解集是它的一次平移。秩决定维数 \(n-r\)，特解决定“平移量”。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'eigen',
      number: '05',
      title: '特征值与特征向量',
      en: 'Eigenvalues',
      icon: 'spark',
      tone: 'violet',
      level: '核心',
      hours: 6,
      tagline: '寻找变换中不改变方向的轴',
      description: '从特征方程到相似对角化，理解矩阵在合适坐标下的最简形态，以及实对称矩阵的特殊优待。',
      sections: [
        {
          id: 'eigen-definition',
          title: '特征值与特征向量',
          minutes: 12,
          summary: '从 Ax=λx 出发，理解特征值、特征多项式与特征子空间。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>特征值与特征向量</h4>
              <p>设 \(A\) 为 \(n\) 阶方阵。若存在数 \(\lambda\) 与非零向量 \(\mathbf{x}\)，使得
                \[
                  A\mathbf{x}=\lambda\mathbf{x},
                \]
                则称 \(\lambda\) 为 \(A\) 的<strong>特征值</strong>，\(\mathbf{x}\) 为属于 \(\lambda\) 的<strong>特征向量</strong>。</p>
            </div>
            <p>这个式子说明：矩阵作用在 \(\mathbf{x}\) 上，只改变它的长度（倍数为 \(\lambda\)），不改变方向（\(\lambda&lt;0\) 时反向）。用 \(I\) 改写：\((A-\lambda I)\mathbf{x}=\mathbf{0}\)。要存在非零解，系数矩阵必须不可逆，于是得到<strong>特征方程</strong>：</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">特征多项式</span></div>
              <div class="math-display">
                \[
                  \det(A-\lambda I)=0.
                \]
              </div>
              <p class="formula-block-note">这是关于 \(\lambda\) 的 \(n\) 次多项式，称为特征多项式。它的根（计入重数）就是全部特征值。</p>
            </div>
            <p>对每个特征值 \(\lambda_i\)，解齐次方程组 \((A-\lambda_i I)\mathbf{x}=\mathbf{0}\)，其非零解就是对应的特征向量。解空间 \(E_{\lambda_i}=N(A-\lambda_i I)\) 称为<strong>特征子空间</strong>，其维数称为几何重数。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>求特征值</span></div>
              <div class="example-body">
                <div class="example-problem">求 \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\) 的特征值与特征向量。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\(\det(A-\lambda I)=\begin{vmatrix}2-\lambda&1\\1&2-\lambda\end{vmatrix}=(2-\lambda)^2-1\)。</li>
                  <li>令其为零：\((\lambda-2)^2=1\)，即 \(\lambda=1\) 或 \(\lambda=3\)。</li>
                  <li>\(\lambda=1\)：解 \(\begin{pmatrix}1&1\\1&1\end{pmatrix}\mathbf{x}=0\)，得 \(\mathbf{x}=k(1,-1)^{\mathrm T}\)。</li>
                  <li>\(\lambda=3\)：解 \(\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\mathbf{x}=0\)，得 \(\mathbf{x}=k(1,1)^{\mathrm T}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>特征值 \(1,3\)；对应特征向量 \(k(1,-1)^{\mathrm T}\)、\(k(1,1)^{\mathrm T}\)（\(k\ne0\)）。</div>
              </div>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">特征值的两个基本和</span></div>
              <div class="math-display">
                \[
                  \lambda_1+\lambda_2+\cdots+\lambda_n=\operatorname{tr}(A),
                  \qquad
                  \lambda_1\lambda_2\cdots\lambda_n=\det A.
                \]
              </div>
              <p class="formula-block-note">常用来快速检查特征值是否算对，或已知部分特征值时反推另一个。</p>
            </div>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>特征向量不能是零向量</h4><p>零向量对任何 \(\lambda\) 都满足 \(A\mathbf{0}=\lambda\mathbf{0}\)，没有信息量。因此定义中必须要求 \(\mathbf{x}\ne\mathbf{0}\)；特征值则可以是 0。</p></div>
            </div>
          `
        },
        {
          id: 'eigen-properties',
          title: '特征值的性质与重数',
          minutes: 13,
          summary: '理解不同特征值的特征向量线性无关，以及代数重数与几何重数的关系。',
          html: r`
            <p>特征值把矩阵的许多性质浓缩成一组数。以下是高频结论：</p>
            <ul>
              <li>属于<strong>不同特征值</strong>的特征向量线性无关。更一般地，从各特征值的特征子空间中各取一组线性无关向量，合起来仍线性无关。</li>
              <li>\(\lambda\) 是 \(A\) 的特征值 \(\iff\) \(k\lambda\) 是 \(kA\) 的特征值；\(\lambda^m\) 是 \(A^m\) 的特征值；若 \(A\) 可逆，则 \(\lambda^{-1}\) 是 \(A^{-1}\) 的特征值。</li>
              <li>若 \(f(x)\) 是多项式，则 \(f(\lambda)\) 是 \(f(A)\) 的特征值，且对应的特征向量不变。</li>
              <li>\(A\) 与 \(A^{\mathrm T}\) 有相同的特征多项式，因此特征值相同。</li>
              <li>三角矩阵的特征值就是主对角线元素。</li>
            </ul>
            <div class="definition-card">
              <span class="block-label">Definition · 重数</span>
              <h4>代数重数与几何重数</h4>
              <p>\(\lambda_0\) 作为特征多项式根的重数，称为它的<strong>代数重数</strong>；特征子空间 \(E_{\lambda_0}\) 的维数 \(n-r(A-\lambda_0 I)\)，称为它的<strong>几何重数</strong>。总有
                \[
                  1\le \text{几何重数}\le \text{代数重数}.
                \]
              </p>
            </div>
            <p>几何重数不足是矩阵不能对角化的根本原因。如果每个特征值的几何重数都等于代数重数，矩阵就可以对角化；否则会出现若尔当块。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>重数 · 反例</span></div>
              <div class="example-body">
                <div class="example-problem">说明 \(A=\begin{pmatrix}1&1\\0&1\end{pmatrix}\) 不能对角化。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>特征多项式为 \((1-\lambda)^2\)，特征值 \(\lambda=1\)（代数重数 2）。</li>
                  <li>解 \((A-I)\mathbf{x}=\mathbf{0}\)，即 \(\begin{pmatrix}0&1\\0&0\end{pmatrix}\mathbf{x}=0\)。</li>
                  <li>得 \(x_2=0\)，特征子空间是一维的，几何重数为 1。</li>
                  <li>几何重数小于代数重数，所以没有足够多的线性无关特征向量，不能对角化。</li>
                </ol>
                <div class="example-answer"><strong>结论</strong>不可对角化，相似标准形为 \(\begin{pmatrix}1&1\\0&1\end{pmatrix}\)（若尔当块）。</div>
              </div>
            </div>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>用迹和行列式检查</h4><p>求出特征值后，先验算它们的和等于主对角线之和，积等于行列式。这个检查能快速发现展开或求根错误。</p></div>
            </div>
          `
        },
        {
          id: 'eigen-diagonalization',
          title: '相似矩阵与相似对角化',
          minutes: 14,
          summary: '用可逆矩阵换基，把矩阵变成对角形；掌握可对角化的充要条件。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>相似</h4>
              <p>若存在可逆矩阵 \(P\)，使得
                \[
                  P^{-1}AP=B,
                \]
                则称 \(A\) 与 \(B\) 相似，记作 \(A\sim B\)。相似是同一个线性变换在不同基下的矩阵表示。</p>
            </div>
            <p>相似矩阵共享大量不变量：行列式、迹、秩、特征多项式、特征值（含代数重数）都相同。但相似矩阵不一定相等，也不一定是对角矩阵。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 可对角化</span>
              <h4>n 阶矩阵可对角化的充要条件</h4>
              <p>\(A\) 可对角化 \(\iff\) \(A\) 有 \(n\) 个线性无关的特征向量。等价地，每个特征值的几何重数等于代数重数。此时令
                \[
                  P=(\mathbf{p}_1,\mathbf{p}_2,\dots,\mathbf{p}_n),\qquad
                  P^{-1}AP=\operatorname{diag}(\lambda_1,\dots,\lambda_n),
                \]
                其中 \(\mathbf{p}_i\) 是属于 \(\lambda_i\) 的特征向量。</p>
            </div>
            <p>特别地，若 \(A\) 有 \(n\) 个<strong>互不相同</strong>的特征值，则一定可对角化。但特征值有重根时也可能可对角化，例如单位矩阵。</p>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>对角化</span></div>
              <div class="example-body">
                <div class="example-problem">将 \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\) 对角化。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>由上例，特征值为 \(1,3\)，对应特征向量可取 \(\mathbf{p}_1=(1,-1)^{\mathrm T}\)，\(\mathbf{p}_2=(1,1)^{\mathrm T}\)。</li>
                  <li>令 \(P=(\mathbf{p}_1,\mathbf{p}_2)=\begin{pmatrix}1&1\\-1&1\end{pmatrix}\)。</li>
                  <li>则 \(P^{-1}AP=\begin{pmatrix}1&0\\0&3\end{pmatrix}\)。注意对角元顺序要与 \(P\) 中特征向量的顺序一致。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(P^{-1}AP=\operatorname{diag}(1,3)\)，其中 \(P=\begin{pmatrix}1&1\\-1&1\end{pmatrix}\)。</div>
              </div>
            </div>
            <p>对角化的威力在于计算幂：若 \(A=P\Lambda P^{-1}\)，则
              \[
                A^k=P\Lambda^k P^{-1},
              \]
              而 \(\Lambda^k\) 只需把对角线元素分别求 \(k\) 次幂。这使矩阵幂、线性递推、微分方程组等问题大幅简化。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>P 不唯一，顺序要匹配</h4><p>特征向量可以任意缩放，因此 \(P\) 不唯一；若交换 \(P\) 的两列，\(\Lambda\) 的对角元也要相应交换。只写 \(P^{-1}AP=\Lambda\) 而忽略顺序，是常见失分点。</p></div>
            </div>
          `
        },
        {
          id: 'eigen-symmetric',
          title: '实对称矩阵的正交对角化',
          minutes: 14,
          summary: '实对称矩阵一定可以正交对角化；掌握标准流程与正交矩阵。',
          html: r`
            <p>实对称矩阵是线性代数中“最听话”的一类矩阵，它拥有普通矩阵没有的三条优良性质：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>特征值全为实数</strong><p>不会出现复特征值。</p></div>
              <div class="concept-tile"><strong>不同特征值的特征向量正交</strong><p>属于不同特征子空间的特征向量自动正交。</p></div>
              <div class="concept-tile"><strong>一定可正交对角化</strong><p>存在正交矩阵 \(Q\) 使 \(Q^{\mathrm T}AQ=\Lambda\)。</p></div>
              <div class="concept-tile"><strong>代数重数等于几何重数</strong><p>每个特征值都有足够多的特征向量。</p></div>
            </div>
            <div class="theorem-card">
              <span class="block-label">Theorem · 谱定理</span>
              <h4>正交相似于对角矩阵</h4>
              <p>若 \(A^{\mathrm T}=A\)，则存在正交矩阵 \(Q\)（\(Q^{\mathrm T}Q=I\)）和对角矩阵 \(\Lambda\)，使得
                \[
                  Q^{\mathrm T}AQ=\Lambda.
                \]
                \(Q\) 的列向量是 \(A\) 的一组标准正交特征向量，\(\Lambda\) 的对角元是对应特征值。</p>
            </div>
            <p>标准流程：</p>
            <ol class="step-list">
              <li><strong>求特征值：</strong>解 \(\det(A-\lambda I)=0\)。</li>
              <li><strong>求特征向量：</strong>对每个特征值解 \((A-\lambda I)\mathbf{x}=\mathbf{0}\)。</li>
              <li><strong>正交化：</strong>同一特征值对应多个向量时，用施密特正交化；不同特征值的向量已自动正交。</li>
              <li><strong>单位化：</strong>把每个特征向量除以它的长度，得到标准正交组。</li>
              <li><strong>组装：</strong>令 \(Q=(\mathbf{q}_1,\dots,\mathbf{q}_n)\)，则 \(Q^{\mathrm T}AQ=\operatorname{diag}(\lambda_1,\dots,\lambda_n)\)。</li>
            </ol>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>正交对角化</span></div>
              <div class="example-body">
                <div class="example-problem">对 \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\) 作正交对角化。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>特征值 \(1,3\)，特征向量 \((1,-1)^{\mathrm T}\)、\((1,1)^{\mathrm T}\) 已经正交。</li>
                  <li>单位化得 \(\mathbf{q}_1=\frac{1}{\sqrt2}(1,-1)^{\mathrm T}\)，\(\mathbf{q}_2=\frac{1}{\sqrt2}(1,1)^{\mathrm T}\)。</li>
                  <li>令 \(Q=(\mathbf{q}_1,\mathbf{q}_2)=\frac{1}{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}\)，则 \(Q^{\mathrm T}AQ=\operatorname{diag}(1,3)\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(Q=\frac1{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}\)，\(Q^{\mathrm T}AQ=\begin{pmatrix}1&0\\0&3\end{pmatrix}\)。</div>
              </div>
            </div>
            <p>正交对角化是二次型化简、主轴分析和对称矩阵函数的核心工具。与一般相似对角化不同，这里要求 \(P\) 是正交矩阵，因此 \(P^{-1}=P^{\mathrm T}\)。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>重特征值才需要正交化</h4><p>不同特征值对应的特征向量在实对称情形下自动正交；只有同一个特征值对应多个特征向量时，才需要在这一特征子空间内部做施密特正交化。</p></div>
            </div>
          `
        },
        {
          id: 'eigen-jordan',
          title: '若尔当标准形简介',
          minutes: 9,
          summary: '当矩阵不能对角化时，相似标准形会变成什么样子？',
          html: r`
            <p>并非所有矩阵都能对角化。对于不能对角化的矩阵，我们仍可以在相似意义下把它化简为<strong>若尔当标准形</strong>：对角线上是特征值，紧挨对角线上方是 0 或 1。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">若尔当块</span></div>
              <div class="math-display">
                \[
                  J_k(\lambda)=
                  \begin{pmatrix}
                  \lambda&1&&\\
                  &\lambda&\ddots&\\
                  &&\ddots&1\\
                  &&&\lambda
                  \end{pmatrix}_{k\times k}.
                \]
              </div>
              <p class="formula-block-note">\(k=1\) 时就是对角块 \([\lambda]\)。一个若尔当块只有一个线性无关的特征向量。</p>
            </div>
            <p>复数域上，任意方阵都相似于一个若尔当标准形，且若尔当块的结构（不计块的排列顺序）由矩阵唯一决定。若某个特征值的所有若尔当块都是一阶的，矩阵就可对角化。</p>
            <p>若尔当标准形在理论上非常重要，它刻画了矩阵在“最简相似形态”下的完整结构。但它对数值扰动非常敏感，实际计算中很少直接求若尔当形；数值线性代数更常使用 Schur 分解、奇异值分解等稳定工具。</p>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>本课程要求</h4><p>基础线性代数通常只需掌握“可对角化的判定”和“实对称矩阵必可正交对角化”。若尔当标准形作为拓展了解即可。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'quadratic',
      number: '06',
      title: '二次型',
      en: 'Quadratic Forms',
      icon: 'quadratic',
      tone: 'green',
      level: '核心',
      hours: 5,
      tagline: '用矩阵读懂二次曲面',
      description: '把二次齐次多项式写成 xᵀAx，用合同变换化简，判断正定性并理解惯性定理。',
      sections: [
        {
          id: 'quadratic-form',
          title: '二次型及其矩阵表示',
          minutes: 11,
          summary: '把二次多项式写成矩阵形式，理解对称矩阵与二次型的一一对应。',
          html: r`
            <p>只含二次项的多项式称为<strong>二次型</strong>。例如
              \[
                f(x_1,x_2)=2x_1^2+4x_1x_2+5x_2^2
              \]
              可以用对称矩阵写成
              \[
                f=\mathbf{x}^{\mathrm T}A\mathbf{x},\qquad
                A=\begin{pmatrix}2&2\\2&5\end{pmatrix},\quad
                \mathbf{x}=(x_1,x_2)^{\mathrm T}.
              \]
              交叉项的系数被平均分给 \(a_{12}\) 与 \(a_{21}\)，因此二次型对应的矩阵总可以取为<strong>对称矩阵</strong>。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 一一对应</span>
              <h4>二次型 ↔ 对称矩阵</h4>
              <p>每个 \(n\) 元二次型都唯一对应一个 \(n\) 阶实对称矩阵 \(A\)，满足
                \[
                  f(\mathbf{x})=\mathbf{x}^{\mathrm T}A\mathbf{x}.
                \]
                反之，每个实对称矩阵都定义一个二次型。矩阵 \(A\) 的秩称为二次型的秩。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>写出矩阵</span></div>
              <div class="example-body">
                <div class="example-problem">写出二次型 \(f=x_1^2+2x_1x_2+3x_1x_3+4x_2^2-2x_2x_3+5x_3^2\) 的矩阵。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>平方项系数放在主对角线：\(a_{11}=1,a_{22}=4,a_{33}=5\)。</li>
                  <li>交叉项系数除以 2 后对称放置：\(a_{12}=a_{21}=1\)，\(a_{13}=a_{31}=\frac32\)，\(a_{23}=a_{32}=-1\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>
                  \(A=\begin{pmatrix}1&1&\frac32\\1&4&-1\\\frac32&-1&5\end{pmatrix}\)。
                </div>
              </div>
            </div>
            <p>二次型的矩阵表示把“配方”问题转化为矩阵的合同变换问题。若令可逆线性变换 \(\mathbf{x}=C\mathbf{y}\)，则
              \[
                f=\mathbf{x}^{\mathrm T}A\mathbf{x}
                =\mathbf{y}^{\mathrm T}(C^{\mathrm T}AC)\mathbf{y}.
              \]
              新矩阵 \(C^{\mathrm T}AC\) 与 \(A\) 合同。二次型化简的目标，就是选一个合适的 \(C\)，使 \(C^{\mathrm T}AC\) 成为对角矩阵。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>交叉项系数别忘除以 2</h4><p>这是二次型写矩阵时最常见的错误。检验方法：把矩阵写回多项式，看 \(x_ix_j\) 的系数是否为 \(2a_{ij}\)。</p></div>
            </div>
          `
        },
        {
          id: 'quadratic-canonical',
          title: '合同变换、配方法与标准形',
          minutes: 14,
          summary: '用可逆线性变换把二次型化为只含平方项的标准形。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>合同</h4>
              <p>设 \(A,B\) 为实对称矩阵。若存在可逆矩阵 \(C\)，使得
                \[
                  B=C^{\mathrm T}AC,
                \]
                则称 \(A\) 与 \(B\) 合同。合同变换保持对称性、秩与正定性。</p>
            </div>
            <p>标准形只含平方项：
              \[
                f=d_1y_1^2+d_2y_2^2+\cdots+d_ny_n^2.
              \]
              把二次型化为标准形有两条常用路径：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>配方法</strong><p>逐项消除交叉项，对应一个可逆线性变换 \(C\)。计算直接，适合手算。</p></div>
              <div class="concept-tile"><strong>正交变换法</strong><p>取 \(C=Q\) 为特征向量组成的正交矩阵，则 \(Q^{\mathrm T}AQ=\Lambda\)，标准形系数就是特征值。</p></div>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>配方法</span></div>
              <div class="example-body">
                <div class="example-problem">将 \(f=x_1^2+2x_1x_2+5x_2^2\) 化为标准形。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>先对 \(x_1\) 配方：\(f=(x_1+x_2)^2+4x_2^2\)。</li>
                  <li>令 \(y_1=x_1+x_2,\ y_2=x_2\)，该变换可逆，逆变换为 \(x_1=y_1-y_2,\ x_2=y_2\)。</li>
                  <li>标准形为 \(f=y_1^2+4y_2^2\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>标准形 \(y_1^2+4y_2^2\)，变换矩阵 \(C=\begin{pmatrix}1&-1\\0&1\end{pmatrix}\)。</div>
              </div>
            </div>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">正交变换法</span></div>
              <div class="math-display">
                \[
                  A=A^{\mathrm T},\quad Q^{\mathrm T}AQ=\Lambda
                  \Longrightarrow
                  f=\lambda_1y_1^2+\cdots+\lambda_ny_n^2.
                \]
              </div>
              <p class="formula-block-note">正交变换保持长度和形状，只旋转坐标轴；标准形的系数恰好是 \(A\) 的特征值。</p>
            </div>
            <p>同一二次型用不同的可逆变换，可能得到不同的标准形（系数不同），但正、负平方项的个数不变。这正是下一节惯性定理的内容。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>合同 vs 相似</h4><p>相似是 \(P^{-1}AP\)，合同是 \(C^{\mathrm T}AC\)。对正交矩阵而言两者恰好一致，但一般可逆矩阵并不满足 \(C^{-1}=C^{\mathrm T}\)。不要混用这两个概念。</p></div>
            </div>
          `
        },
        {
          id: 'quadratic-inertia',
          title: '惯性定理与规范形',
          minutes: 11,
          summary: '无论怎么化简，正负平方项的个数都不变；掌握惯性指数与规范形。',
          html: r`
            <div class="theorem-card">
              <span class="block-label">Theorem · 惯性定理</span>
              <h4>Sylvester 惯性定理</h4>
              <p>实二次型无论经过怎样的可逆线性变换化为标准形，其正平方项的个数 \(p\) 与负平方项的个数 \(q\) 都保持不变。\(p\) 称为<strong>正惯性指数</strong>，\(q\) 称为<strong>负惯性指数</strong>，\(p+q=r(A)\)。</p>
            </div>
            <p>进一步地，通过适当的可逆变换，可以把标准形变为<strong>规范形</strong>：
              \[
                f=y_1^2+\cdots+y_p^2-y_{p+1}^2-\cdots-y_{p+q}^2.
              \]
              规范形由 \(p,q\) 完全确定，因此两个实二次型合同，当且仅当它们有相同的正、负惯性指数。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">惯性指数与特征值</span></div>
              <div class="math-display">
                \[
                  p=\#\{\lambda_i>0\},\qquad
                  q=\#\{\lambda_i<0\},\qquad
                  z=\#\{\lambda_i=0\}=n-r(A).
                \]
              </div>
              <p class="formula-block-note">因为正交变换不改变特征值，所以直接用特征值的符号就能读出正、负惯性指数。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>惯性指数</span></div>
              <div class="example-body">
                <div class="example-problem">求 \(f=2x_1^2+2x_2^2+2x_3^2+2x_1x_2+2x_1x_3+2x_2x_3\) 的惯性指数。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>二次型矩阵为 \(A=2J\)，其中 \(J\) 为全 1 矩阵。</li>
                  <li>\(J\) 的特征值为 \(3,0,0\)，故 \(A\) 的特征值为 \(6,0,0\)。</li>
                  <li>正特征值 1 个，负特征值 0 个，所以 \(p=1,q=0,z=2\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(p=1,\ q=0\)，规范形为 \(y_1^2\)。</div>
              </div>
            </div>
            <p>惯性定理说明，二次型的“正负结构”是合同不变量。秩相同并不意味着合同，例如 \(x_1^2+x_2^2\) 与 \(x_1^2-x_2^2\) 秩都为 2，但惯性指数不同，因此不合同。</p>
          `
        },
        {
          id: 'quadratic-positive',
          title: '正定二次型与正定矩阵',
          minutes: 13,
          summary: '掌握正定性的多种等价判定，以及顺序主子式判别法。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>正定</h4>
              <p>设 \(A\) 为实对称矩阵。若对任意非零向量 \(\mathbf{x}\ne\mathbf{0}\)，都有
                \[
                  \mathbf{x}^{\mathrm T}A\mathbf{x}>0,
                \]
                则称 \(A\) 为正定矩阵，对应的二次型为正定二次型。若严格小于 0，则称负定；其余情形可能是半正定或不定。</p>
            </div>
            <p>正定矩阵有一长串等价刻画，选择最方便的一条即可：</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">正定的等价条件</span></div>
              <div class="math-display">
                \[
                  \begin{aligned}
                  A\text{ 正定}
                  &\iff A\text{ 的特征值全大于 }0\\
                  &\iff A\text{ 的正惯性指数 }p=n\\
                  &\iff A\text{ 的各阶顺序主子式全大于 }0\\
                  &\iff \exists\text{ 可逆 }D,\ A=D^{\mathrm T}D.
                  \end{aligned}
                \]
              </div>
              <p class="formula-block-note">顺序主子式判别法（Sylvester 判据）只需计算左上角各阶子式，是手算最常用的方法。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>判定正定</span></div>
              <div class="example-body">
                <div class="example-problem">判断 \(A=\begin{pmatrix}2&1\\1&3\end{pmatrix}\) 是否正定。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>一阶顺序主子式：\(2>0\)。</li>
                  <li>二阶顺序主子式：\(\det A=6-1=5>0\)。</li>
                  <li>所有顺序主子式为正，所以 \(A\) 正定。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>正定。也可由特征值 \(\frac{5\pm\sqrt5}{2}\) 均为正得到同样的结论。</div>
              </div>
            </div>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>顺序主子式，不是所有子式</h4><p>Sylvester 判据要求的是左上角 \(1,2,\dots,n\) 阶<strong>顺序</strong>主子式。只检查各阶任意主子式或只检查行列式，都不足以判定正定。</p></div>
            </div>
            <p>正定矩阵在优化、统计和数值计算中无处不在：它保证二次函数有唯一极小值，保证 Cholesky 分解存在，也保证内积 \(\langle\mathbf{x},\mathbf{y}\rangle_A=\mathbf{x}^{\mathrm T}A\mathbf{y}\) 合法。</p>
          `
        },
        {
          id: 'quadratic-apply',
          title: '二次型的几何与应用',
          minutes: 9,
          summary: '用特征值识别椭圆、双曲线与二次曲面，并理解瑞利商。',
          html: r`
            <p>二次型的符号结构决定了等值线的形状。以二元二次型 \(f=\mathbf{x}^{\mathrm T}A\mathbf{x}=1\) 为例：</p>
            <table class="math-table">
              <thead><tr><th>特征值符号</th><th>曲线类型</th><th>典型例子</th></tr></thead>
              <tbody>
                <tr><td>两个正特征值</td><td>椭圆</td><td>\(x^2+2y^2=1\)</td></tr>
                <tr><td>一正一负</td><td>双曲线</td><td>\(x^2-y^2=1\)</td></tr>
                <tr><td>一个为零、一个正</td><td>两条平行直线</td><td>\(x^2=1\)</td></tr>
                <tr><td>两个负特征值</td><td>空集（无实点）</td><td>\(-x^2-y^2=1\)</td></tr>
              </tbody>
            </table>
            <p>在三维中，正惯性指数、负惯性指数与零特征值的个数决定了椭球面、单叶双曲面、双叶双曲面、锥面等二次曲面的类型。正交对角化相当于旋转坐标轴，把倾斜的曲面摆正。</p>
            <div class="formula-block">
              <div class="formula-block-head"><span class="formula-block-label">瑞利商</span></div>
              <div class="math-display">
                \[
                  R_A(\mathbf{x})=\frac{\mathbf{x}^{\mathrm T}A\mathbf{x}}{\mathbf{x}^{\mathrm T}\mathbf{x}},
                  \qquad
                  \lambda_{\min}\le R_A(\mathbf{x})\le\lambda_{\max}.
                \]
              </div>
              <p class="formula-block-note">瑞利商的最大值与最小值分别等于最大、最小特征值，在优化与数值分析中用于估计特征值。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 05</span><span>识别曲线</span></div>
              <div class="example-body">
                <div class="example-problem">判断 \(2x^2+4xy+5y^2=1\) 表示什么曲线。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>矩阵 \(A=\begin{pmatrix}2&2\\2&5\end{pmatrix}\)，特征多项式为 \((2-\lambda)(5-\lambda)-4\)。</li>
                  <li>展开得 \(\lambda^2-7\lambda+6=0\)，特征值为 \(1,6\)，均为正。</li>
                  <li>正交变换后可化为 \(u^2+6v^2=1\)，是椭圆。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>椭圆。</div>
              </div>
            </div>
            <p>二次型还用于判断多元函数的极值：在临界点处，Hessian 矩阵正定对应极小值，负定对应极大值，不定对应鞍点。这把线性代数的“正定”与微积分的“二阶条件”连接了起来。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>从代数到几何</h4><p>正交对角化不改变图形，只旋转坐标系。特征值决定各主轴方向的伸缩比例，因此读懂特征值，就读懂了二次曲面的形状。</p></div>
            </div>
          `
        }
      ]
    },
    {
      id: 'spaces',
      number: '07',
      title: '线性空间与线性变换',
      en: 'Linear Spaces',
      icon: 'space',
      tone: 'slate',
      level: '进阶',
      hours: 5,
      tagline: '从计算走向结构',
      description: '把向量、矩阵与变换统一到线性空间的语言中，理解基变换、坐标变换与线性映射的矩阵表示。',
      sections: [
        {
          id: 'space-definition',
          title: '线性空间的定义与子空间',
          minutes: 10,
          summary: '用公理刻画“可以做加法与数乘”的集合，认识子空间判定。',
          html: r`
            <p>前面的向量、矩阵、多项式看似不同，却共享同一套线性结构。把这种结构抽象出来，就得到<strong>线性空间</strong>（向量空间）。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>线性空间</h4>
              <p>设 \(V\) 是一个非空集合，\(F\) 是一个数域。若在 \(V\) 上定义了加法与数乘，且对任意 \(\boldsymbol{\alpha},\boldsymbol{\beta},\boldsymbol{\gamma}\in V\) 与 \(k,l\in F\)，满足加法交换律、结合律、零元、负元以及数乘的分配律、结合律、单位律，则称 \(V\) 为数域 \(F\) 上的线性空间。</p>
            </div>
            <p>这些公理并不神秘，它们只是把 \(\mathbb{R}^n\) 中我们已经熟悉的运算规律抽象出来。常见例子包括：</p>
            <ul>
              <li>\(\mathbb{R}^n\)：\(n\) 维实列向量空间；</li>
              <li>\(M_{m\times n}(\mathbb{R})\)：所有 \(m\times n\) 实矩阵；</li>
              <li>\(P_n[x]\)：次数不超过 \(n\) 的实系数多项式；</li>
              <li>\(C[a,b]\)：闭区间上所有连续函数。</li>
            </ul>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>子空间</h4>
              <p>线性空间 \(V\) 的非空子集 \(W\) 若对加法与数乘封闭，即对任意 \(\boldsymbol{\alpha},\boldsymbol{\beta}\in W\)、\(k\in F\)，都有 \(\boldsymbol{\alpha}+\boldsymbol{\beta}\in W\)、\(k\boldsymbol{\alpha}\in W\)，则称 \(W\) 为 \(V\) 的子空间。</p>
            </div>
            <p>判定子空间时，首先检查零元是否在集合中；然后检查对加法与数乘是否封闭。只满足其中一条不够。例如，平面中不过原点的直线不是子空间，因为它不含零向量，且两个点的中点不一定还在直线上。</p>
            <div class="note-card">
              <span class="note-card-icon" data-icon="info"></span>
              <div><h4>子空间的交与和</h4><p>两个子空间的交集仍是子空间；它们的并集通常不是子空间，但所有“和” \(\boldsymbol{\alpha}+\boldsymbol{\beta}\) 构成的集合是子空间，称为和空间。</p></div>
            </div>
          `
        },
        {
          id: 'space-basis',
          title: '基、维数与同构',
          minutes: 12,
          summary: '理解维数作为空间的“自由度”，以及所有 n 维空间在结构上相同。',
          html: r`
            <p>基与维数是线性空间的核心不变量。一组向量若线性无关且能生成整个空间，就是一组基；基所含向量的个数就是维数。零空间的维数规定为 0。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 维数公式</span>
              <h4>子空间的和与交</h4>
              <p>若 \(U,W\) 是有限维线性空间 \(V\) 的子空间，则
                \[
                  \dim(U+W)=\dim U+\dim W-\dim(U\cap W).
                \]
                当 \(U\cap W=\{0\}\) 时，和空间称为直和，记作 \(U\oplus W\)，此时维数相加。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 01</span><span>求基与维数</span></div>
              <div class="example-body">
                <div class="example-problem">求 \(W=\{(x,y,z)^{\mathrm T}:x+y+z=0\}\) 的一组基与维数。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>由 \(z=-x-y\)，任意向量可写成 \((x,y,-x-y)^{\mathrm T}=x(1,0,-1)^{\mathrm T}+y(0,1,-1)^{\mathrm T}\)。</li>
                  <li>\((1,0,-1)^{\mathrm T}\) 与 \((0,1,-1)^{\mathrm T}\) 线性无关。</li>
                  <li>它们生成 \(W\)，所以是一组基，\(\dim W=2\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>基为 \((1,0,-1)^{\mathrm T},(0,1,-1)^{\mathrm T}\)，维数为 2。</div>
              </div>
            </div>
            <p>若两个线性空间之间存在可逆线性映射，则称它们<strong>同构</strong>。数域 \(F\) 上任意 \(n\) 维线性空间都与 \(F^n\) 同构。这意味着：抽象空间中的计算，都可以通过选择一组基，转化为坐标向量与矩阵的计算。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>维数是“自由度”</h4><p>一个约束方程通常减少一个自由度。\(n\) 个未知量、秩为 \(r\) 的齐次方程组，其解空间维数为 \(n-r\)，这正是“自由变量个数”的几何解释。</p></div>
            </div>
          `
        },
        {
          id: 'space-transition',
          title: '基变换与坐标变换',
          minutes: 13,
          summary: '换一组基，坐标如何变化？过渡矩阵把两套坐标连接起来。',
          html: r`
            <p>设 \(\mathcal{B}=(\boldsymbol{\varepsilon}_1,\dots,\boldsymbol{\varepsilon}_n)\) 与 \(\mathcal{B}'=(\boldsymbol{\eta}_1,\dots,\boldsymbol{\eta}_n)\) 是同一空间的两组基。若
              \[
                (\boldsymbol{\eta}_1,\dots,\boldsymbol{\eta}_n)
                =(\boldsymbol{\varepsilon}_1,\dots,\boldsymbol{\varepsilon}_n)P,
              \]
              则称 \(P\) 为从基 \(\mathcal{B}\) 到基 \(\mathcal{B}'\) 的<strong>过渡矩阵</strong>。\(P\) 的第 \(j\) 列就是 \(\boldsymbol{\eta}_j\) 在旧基 \(\mathcal{B}\) 下的坐标。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 坐标变换</span>
              <h4>旧坐标与新坐标</h4>
              <p>若向量 \(\boldsymbol{\alpha}\) 在旧基下的坐标为 \(\mathbf{x}\)，在新基下的坐标为 \(\mathbf{y}\)，则
                \[
                  \mathbf{x}=P\mathbf{y},
                  \qquad
                  \mathbf{y}=P^{-1}\mathbf{x}.
                \]
                注意方向：过渡矩阵 \(P\) 把<strong>新坐标</strong>变成<strong>旧坐标</strong>。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 02</span><span>过渡矩阵</span></div>
              <div class="example-body">
                <div class="example-problem">在 \(\mathbb{R}^2\) 中，取旧基 \(\boldsymbol{\varepsilon}_1=(1,0)^{\mathrm T},\boldsymbol{\varepsilon}_2=(0,1)^{\mathrm T}\)，新基 \(\boldsymbol{\eta}_1=(1,1)^{\mathrm T},\boldsymbol{\eta}_2=(1,-1)^{\mathrm T}\)。求过渡矩阵及向量 \((3,1)^{\mathrm T}\) 在新基下的坐标。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>\((\boldsymbol{\eta}_1,\boldsymbol{\eta}_2)=(\boldsymbol{\varepsilon}_1,\boldsymbol{\varepsilon}_2)\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)，所以 \(P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)。</li>
                  <li>\(P^{-1}=\frac{1}{-2}\begin{pmatrix}-1&-1\\-1&1\end{pmatrix}=\frac12\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)。</li>
                  <li>新坐标 \(\mathbf{y}=P^{-1}(3,1)^{\mathrm T}=(2,1)^{\mathrm T}\)。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}\)，新坐标为 \((2,1)^{\mathrm T}\)。</div>
              </div>
            </div>
            <p>基变换的思想贯穿全书：相似矩阵 \(B=P^{-1}AP\) 就是同一线性变换在两组基下的矩阵；正交对角化则是选择一组特殊的标准正交基，使矩阵变成对角形。换一个坐标看问题，往往能让结构显现。</p>
            <div class="note-card warn">
              <span class="note-card-icon" data-icon="alert"></span>
              <div><h4>方向容易写反</h4><p>由旧基到新基的过渡矩阵为 \(P\)，但坐标变换是 \(P^{-1}\)。记忆方法：新基向量在旧基下表示成矩阵 \(P\)，同一个向量的旧坐标就等于 \(P\) 乘新坐标。</p></div>
            </div>
          `
        },
        {
          id: 'space-transform',
          title: '线性变换及其矩阵表示',
          minutes: 14,
          summary: '把线性变换写成矩阵，理解核、像与秩-零化度定理。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>线性变换</h4>
              <p>映射 \(T:V\to W\) 若对任意 \(\boldsymbol{\alpha},\boldsymbol{\beta}\in V\) 与数 \(k\)，满足
                \[
                  T(\boldsymbol{\alpha}+\boldsymbol{\beta})=T(\boldsymbol{\alpha})+T(\boldsymbol{\beta}),
                  \qquad
                  T(k\boldsymbol{\alpha})=kT(\boldsymbol{\alpha}),
                \]
                则称 \(T\) 为线性变换（线性映射）。</p>
            </div>
            <p>选定 \(V\) 的基 \(\mathcal{B}\) 与 \(W\) 的基 \(\mathcal{C}\) 后，线性变换可以用矩阵 \(A\) 表示：若 \(\mathbf{x}\) 是输入向量的坐标，则输出向量的坐标为 \(A\mathbf{x}\)。矩阵的第 \(j\) 列就是第 \(j\) 个基向量的像的坐标。</p>
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>核与像</h4>
              <p>线性变换 \(T\) 的<strong>核</strong>为
                \[
                  \ker T=\{\mathbf{x}\in V:T(\mathbf{x})=\mathbf{0}\},
                \]
                其维数称为零化度；<strong>像</strong>为
                \[
                  \operatorname{Im}T=\{T(\mathbf{x}):\mathbf{x}\in V\},
                \]
                其维数称为秩。核是 \(V\) 的子空间，像是 \(W\) 的子空间。</p>
            </div>
            <div class="theorem-card">
              <span class="block-label">Theorem · 秩-零化度定理</span>
              <h4>维数守恒</h4>
              <p>若 \(V\) 有限维，则
                \[
                  \dim V=\dim\ker T+\dim\operatorname{Im}T.
                \]
                用矩阵语言说，就是 \(n=r(A)+(\text{零空间维数})\)，即 \(n-r(A)\) 个自由变量对应核空间。</p>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 03</span><span>核与像</span></div>
              <div class="example-body">
                <div class="example-problem">设 \(T:\mathbb{R}^3\to\mathbb{R}^2\)，\(T(x,y,z)=(x+y,y+z)\)，求核与像的维数。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>矩阵 \(A=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}\)，显然 \(r(A)=2\)。</li>
                  <li>像空间是 \(\mathbb{R}^2\)，\(\dim\operatorname{Im}T=2\)。</li>
                  <li>由秩-零化度定理，\(\dim\ker T=3-2=1\)。</li>
                  <li>解 \(x+y=0,y+z=0\)，得核由 \((1,-1,1)^{\mathrm T}\) 张成。</li>
                </ol>
                <div class="example-answer"><strong>答案</strong>\(\dim\ker T=1\)，\(\dim\operatorname{Im}T=2\)。</div>
              </div>
            </div>
            <p>线性变换的复合对应矩阵乘法，可逆变换对应可逆矩阵。同一个线性变换在不同基下的矩阵相似，这正是相似矩阵的几何意义：它们描述的是同一个变换，只是坐标选得不同。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>矩阵是变换的“照片”</h4><p>矩阵不是变换本身，而是变换在某一组基下的记录。换一组基，照片会变，但变换的内核不变；相似标准形就是这张照片最简洁的版本。</p></div>
            </div>
          `
        },
        {
          id: 'space-invariant',
          title: '不变子空间与对角化的统一视角',
          minutes: 10,
          summary: '用不变子空间解释特征向量与对角化，把全书线索收束到一起。',
          html: r`
            <div class="definition-card">
              <span class="block-label">Definition · 定义</span>
              <h4>不变子空间</h4>
              <p>设 \(T:V\to V\) 是线性变换，\(W\subseteq V\) 是子空间。若对任意 \(\mathbf{w}\in W\)，都有 \(T(\mathbf{w})\in W\)，则称 \(W\) 为 \(T\) 的<strong>不变子空间</strong>。</p>
            </div>
            <p>一维不变子空间恰好由特征向量张成：若 \(W=\operatorname{span}\{\mathbf{v}\}\) 且 \(T(\mathbf{v})=\lambda\mathbf{v}\)，则 \(W\) 在 \(T\) 下不变。因此，寻找特征向量就是寻找变换“不改变方向”的一维子空间。</p>
            <div class="theorem-card">
              <span class="block-label">Theorem · 对角化的结构解释</span>
              <h4>直和分解</h4>
              <p>\(T\) 可对角化 \(\iff\) \(V\) 可以分解为若干一维不变子空间的直和：
                \[
                  V=E_{\lambda_1}\oplus E_{\lambda_2}\oplus\cdots\oplus E_{\lambda_s},
                \]
                其中 \(E_{\lambda_i}\) 是特征子空间。此时在每个特征子空间内取一组基，合起来就是 \(V\) 的一组基，\(T\) 在这组基下的矩阵为对角矩阵。</p>
            </div>
            <p>从不变子空间的角度，整个线性代数的主线变得清晰：</p>
            <div class="concept-grid">
              <div class="concept-tile"><strong>矩阵</strong><p>线性变换在选定基下的坐标表示。</p></div>
              <div class="concept-tile"><strong>秩</strong><p>像空间的维数，衡量变换保留了多少独立方向。</p></div>
              <div class="concept-tile"><strong>特征值</strong><p>一维不变子空间上的伸缩倍数。</p></div>
              <div class="concept-tile"><strong>对角化</strong><p>找到足够多不变直线，把空间拆成直和。</p></div>
            </div>
            <div class="example-card">
              <div class="example-head"><span>例题 04</span><span>不变子空间</span></div>
              <div class="example-body">
                <div class="example-problem">设 \(A=\begin{pmatrix}2&1\\1&2\end{pmatrix}\)，验证 \(W=\operatorname{span}\{(1,1)^{\mathrm T}\}\) 是 \(A\) 的不变子空间。</div>
                <p class="solution-label">SOLUTION</p>
                <ol class="example-steps">
                  <li>计算 \(A(1,1)^{\mathrm T}=(3,3)^{\mathrm T}=3(1,1)^{\mathrm T}\)。</li>
                  <li>结果仍在 \(W\) 中，且倍数为特征值 3。</li>
                  <li>所以 \(W\) 是一维不变子空间，\((1,1)^{\mathrm T}\) 是对应特征向量。</li>
                </ol>
                <div class="example-answer"><strong>结论</strong>\(W\) 不变，伸缩倍数为 \(3\)。</div>
              </div>
            </div>
            <p>若特征子空间维数不足，矩阵就不能分解成足够多的一维不变子空间，只能退而求其次，得到若尔当块。若尔当标准形正是“最细的不变子空间分解”的矩阵表达。</p>
            <div class="note-card tip">
              <span class="note-card-icon" data-icon="spark"></span>
              <div><h4>把书读薄</h4><p>行列式判断可逆，秩衡量信息量，特征值寻找不变方向，二次型研究对称结构。它们最终都在回答同一个问题：一个线性变换，在合适的坐标下究竟长什么样？</p></div>
            </div>
          `
        }
      ]
    }
  ];
})();
