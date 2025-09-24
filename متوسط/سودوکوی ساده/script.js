// (function () {
//   const COLORS = {
//     success: '#37B75E',
//     empty: '#F5BB88',
//     duplicate: '#DE480D',
//     otherFilled: '#F37540',
//     textWhite: '#ffffff'
//   };

//   const cells = Array.from(document.querySelectorAll('input.cell'));
//   const idToElem = {};
//   cells.forEach(c => idToElem[c.id] = c);

//   const btnCheck = document.getElementById('check');
//   const btnNew = document.getElementById('new');

//   function pxToNum(px) {
//     return px ? parseInt(px.replace('px', ''), 10) : 0;
//   }

//   function readPositions() {
//     return cells.map(c => {
//       const top = pxToNum(c.style.top || getComputedStyle(c).top);
//       const left = pxToNum(c.style.left || getComputedStyle(c).left);
//       return { id: c.id, top, left, elem: c };
//     });
//   }

//   const extraGroups = [
//     // cell_5 neighbors
//     ['cell_5', 'cell_1', 'cell_2', 'cell_4', 'cell_6', 'cell_10', 'cell_11'],
//     // cell_9 neighbors
//     ['cell_9', 'cell_3', 'cell_4', 'cell_8', 'cell_10', 'cell_14', 'cell_15'],
//     // cell_12 neighbors
//     ['cell_12', 'cell_6', 'cell_7', 'cell_11', 'cell_13', 'cell_17', 'cell_18'],
//     // cell_16 neighbors
//     ['cell_16', 'cell_10', 'cell_11', 'cell_15', 'cell_17', 'cell_21', 'cell_22'],
//     // cell_20 neighbors
//     ['cell_20', 'cell_14', 'cell_15', 'cell_19', 'cell_21', 'cell_25', 'cell_26'],
//     // cell_23 neighbors
//     ['cell_23', 'cell_17', 'cell_18', 'cell_22', 'cell_24', 'cell_28', 'cell_29'],
//     // cell_27 neighbors
//     ['cell_27', 'cell_21', 'cell_22', 'cell_26', 'cell_28', 'cell_30', 'cell_31']
//   ];

//   function buildLineGroups() {
//     const pos = readPositions();

//     // horizontal rows by top position
//     const rowsMap = {};
//     pos.forEach(p => {
//       const key = p.top;
//       if (!rowsMap[key]) rowsMap[key] = [];
//       rowsMap[key].push(p.id);
//     });
//     const horizontalGroups = Object.values(rowsMap).map(arr => arr.slice());

//     // دو جهت مورب: left - top و left + top
//     const diag1 = {};
//     const diag2 = {};
//     pos.forEach(p => {
//       const k1 = p.left - p.top;
//       const k2 = p.left + p.top;
//       if (!diag1[k1]) diag1[k1] = [];
//       if (!diag2[k2]) diag2[k2] = [];
//       diag1[k1].push(p.id);
//       diag2[k2].push(p.id);
//     });
//     const diagGroups = Object.values(diag1).concat(Object.values(diag2)).map(a => a.slice());

//     let groups = [].concat(horizontalGroups, diagGroups, extraGroups);

//     // حذف گروه‌های کوتاه‌تر از 2 و حذف تکراری‌ها
//     groups = groups.filter(g => g.length >= 2);
//     const seen = new Set();
//     const uniqueGroups = [];
//     groups.forEach(g => {
//       const key = g.slice().sort((a, b) => a.localeCompare(b)).join(',');
//       if (!seen.has(key)) {
//         seen.add(key);
//         uniqueGroups.push(g);
//       }
//     });

//     return uniqueGroups;
//   }

//   function getCellValue(elem) {
//     const v = elem.value ? String(elem.value).trim() : '';
//     if (!v) return '';
//     const m = v.match(/[1-8]/);
//     return m ? m[0] : '';
//   }

//   function findDuplicatesInGroups(groups) {
//     const duplicates = new Set();
//     groups.forEach(group => {
//       const count = {};
//       group.forEach(id => {
//         const el = idToElem[id];
//         if (!el) return;
//         const val = getCellValue(el);
//         if (val !== '') {
//           count[val] = count[val] ? count[val].concat(id) : [id];
//         }
//       });
//       Object.values(count).forEach(arr => {
//         if (arr.length > 1) arr.forEach(i => duplicates.add(i));
//       });
//     });
//     return duplicates;
//   }

//   function allFilledValid() {
//     return cells.every(c => getCellValue(c) !== '');
//   }

//   function applyColorsOnCheck() {
//     const groups = buildLineGroups();
//     const dupSet = findDuplicatesInGroups(groups);
//     const allFilled = allFilledValid();

//     if (allFilled && dupSet.size === 0) {
//       cells.forEach(c => {
//         c.style.backgroundColor = COLORS.success;
//         c.style.color = COLORS.textWhite;
//         c.disabled = true;
//       });
//       return;
//     }

//     console.log([...dupSet])
//     cells.forEach(c => {
//       c.style.color = COLORS.textWhite;
//       const v = getCellValue(c);
//       if (v === '') {
//         c.style.backgroundColor = COLORS.empty;
//       } else if (dupSet.has(c.id)) {
//         c.style.backgroundColor = COLORS.duplicate;
//       } else {
//         c.style.backgroundColor = COLORS.otherFilled;
//       }
//     });

//   }

//   function onCellInput(e) {
//     const el = e.target;
//     const match = String(el.value || '').match(/[1-8]/);
//     if (match) {
//       el.value = match[0];
//     } else {
//       el.value = '';
//     }
//   }

//   function resetAll() {
//     cells.forEach(c => {
//       c.value = '';
//       c.disabled = false;
//       c.style.backgroundColor = '';
//       c.style.color = '';
//     });
//   }

//   function disableAllAndWhiteText() {
//     cells.forEach(c => {
//       c.disabled = true;
//       c.style.color = COLORS.textWhite;
//     });
//   }

//   function attachListeners() {
//     cells.forEach(c => {
//       c.addEventListener('input', onCellInput);
//       c.addEventListener('paste', (ev) => {
//         ev.preventDefault();
//         const text = (ev.clipboardData || window.clipboardData).getData('text') || '';
//         const m = text.match(/[1-8]/);
//         if (m) c.value = m[0]; else c.value = '';
//       });
//     });

//     btnCheck.addEventListener('click', () => {
//       disableAllAndWhiteText();
//       applyColorsOnCheck();
//     });

//     btnNew.addEventListener('click', () => {
//       resetAll();
//     });
//   }

//   function init() {
//     attachListeners();
//   }

//   init();
// })();








(function () {
  const COLORS = {
    success: '#37B75E',
    empty: '#F5BB88',
    duplicate: '#DE480D',
    otherFilled: '#F37540',
    textWhite: '#ffffff'
  };

  const cells = Array.from(document.querySelectorAll('input.cell'));
  const idToElem = {};
  cells.forEach(c => idToElem[c.id] = c);

  const btnCheck = document.getElementById('check');
  const btnNew = document.getElementById('new');

  // تعریف مستقیم گروه‌های مورب و افقی بر اساس ساختار بازی
  function buildLineGroups() {
    const groups = [];

    // گروه‌های افقی (ردیف‌ها)
    const horizontalGroups = [
      ['cell_1', 'cell_2'],
      ['cell_3', 'cell_4', 'cell_5', 'cell_6', 'cell_7'],
      ['cell_8', 'cell_9', 'cell_10', 'cell_11', 'cell_12', 'cell_13'],
      ['cell_14', 'cell_15', 'cell_16', 'cell_17', 'cell_18'],
      ['cell_19', 'cell_20', 'cell_21', 'cell_22', 'cell_23', 'cell_24'],
      ['cell_25', 'cell_26', 'cell_27', 'cell_28', 'cell_29'],
      ['cell_30', 'cell_31']
    ];

    // گروه‌های مورب از چپ به راست (/)
    const diagonalLeft = [
      ['cell_7', 'cell_13'],
      ['cell_2', 'cell_6', 'cell_12', 'cell_18', 'cell_24'],
      ['cell_1', 'cell_5', 'cell_11', 'cell_17', 'cell_23', 'cell_29'],
      ['cell_4', 'cell_10', 'cell_16', 'cell_22', 'cell_28'],
      ['cell_3', 'cell_9', 'cell_15', 'cell_21', 'cell_27', 'cell_31'],
      ['cell_8', 'cell_14', 'cell_20', 'cell_26', 'cell_30'],
      ['cell_19', 'cell_25']
    ];

    // گروه‌های مورب از راست به چپ (\)
    const diagonalRight = [
      ['cell_24', 'cell_29'],
      ['cell_13', 'cell_18', 'cell_23', 'cell_28', 'cell_31'],
      ['cell_7', 'cell_12', 'cell_17', 'cell_22', 'cell_27', 'cell_30'],
      ['cell_6', 'cell_11', 'cell_16', 'cell_21', 'cell_26'],
      ['cell_2', 'cell_5', 'cell_10', 'cell_15', 'cell_20', 'cell_25'],
      ['cell_1', 'cell_4', 'cell_9', 'cell_14', 'cell_19'],
      ['cell_3', 'cell_8']
    ];

    // گروه‌های اضافی (همسایگی‌ها)
    const extraGroups = [
      // cell_5 neighbors
      ['cell_5', 'cell_1', 'cell_2', 'cell_4', 'cell_6', 'cell_10', 'cell_11'],
      // cell_9 neighbors
      ['cell_9', 'cell_3', 'cell_4', 'cell_8', 'cell_10', 'cell_14', 'cell_15'],
      // cell_12 neighbors
      ['cell_12', 'cell_6', 'cell_7', 'cell_11', 'cell_13', 'cell_17', 'cell_18'],
      // cell_16 neighbors
      ['cell_16', 'cell_10', 'cell_11', 'cell_15', 'cell_17', 'cell_21', 'cell_22'],
      // cell_20 neighbors
      ['cell_20', 'cell_14', 'cell_15', 'cell_19', 'cell_21', 'cell_25', 'cell_26'],
      // cell_23 neighbors
      ['cell_23', 'cell_17', 'cell_18', 'cell_22', 'cell_24', 'cell_28', 'cell_29'],
      // cell_27 neighbors
      ['cell_27', 'cell_21', 'cell_22', 'cell_26', 'cell_28', 'cell_30', 'cell_31']
    ];

    let allGroups = [].concat(horizontalGroups, diagonalLeft, diagonalRight, extraGroups);

    // حذف گروه‌های کوتاه‌تر از 2 و حذف تکراری‌ها
    allGroups = allGroups.filter(g => g.length >= 2);

    const seen = new Set();
    const uniqueGroups = [];
    allGroups.forEach(g => {
      const key = g.slice().sort((a, b) => a.localeCompare(b)).join(',');
      if (!seen.has(key)) {
        seen.add(key);
        uniqueGroups.push(g);
      }
    });

    return uniqueGroups;
  }

  function getCellValue(elem) {
    const v = elem.value ? String(elem.value).trim() : '';
    if (!v) return '';
    const m = v.match(/[1-8]/);
    return m ? m[0] : '';
  }

  function findDuplicatesInGroups(groups) {
    const duplicates = new Set();
    groups.forEach(group => {
      const count = {};
      group.forEach(id => {
        const el = idToElem[id];
        if (!el) return;
        const val = getCellValue(el);
        if (val !== '') {
          count[val] = count[val] ? count[val].concat(id) : [id];
        }
      });
      Object.values(count).forEach(arr => {
        if (arr.length > 1) arr.forEach(i => duplicates.add(i));
      });
    });
    return duplicates;
  }

  function allFilledValid() {
    return cells.every(c => getCellValue(c) !== '');
  }

  function applyColorsOnCheck() {
    const groups = buildLineGroups();
    const dupSet = findDuplicatesInGroups(groups);
    const allFilled = allFilledValid();

    console.log('Groups:', groups);
    console.log('Duplicates found:', [...dupSet]);

    if (allFilled && dupSet.size === 0) {
      cells.forEach(c => {
        c.style.backgroundColor = COLORS.success;
        c.style.color = COLORS.textWhite;
        c.disabled = true;
      });
      return;
    }

    cells.forEach(c => {
      c.style.color = COLORS.textWhite;
      const v = getCellValue(c);
      if (v === '') {
        c.style.backgroundColor = COLORS.empty;
      } else if (dupSet.has(c.id)) {
        c.style.backgroundColor = COLORS.duplicate;
      } else {
        c.style.backgroundColor = COLORS.otherFilled;
      }
    });
  }

  function onCellInput(e) {
    const el = e.target;
    const match = String(el.value || '').match(/[1-8]/);
    if (match) {
      el.value = match[0];
    } else {
      el.value = '';
    }
  }

  function resetAll() {
    cells.forEach(c => {
      c.value = '';
      c.disabled = false;
      c.style.backgroundColor = '';
      c.style.color = '';
    });
  }

  function disableAllAndWhiteText() {
    cells.forEach(c => {
      c.disabled = true;
      c.style.color = COLORS.textWhite;
    });
  }

  function attachListeners() {
    cells.forEach(c => {
      c.addEventListener('input', onCellInput);
      c.addEventListener('paste', (ev) => {
        ev.preventDefault();
        const text = (ev.clipboardData || window.clipboardData).getData('text') || '';
        const m = text.match(/[1-8]/);
        if (m) c.value = m[0]; else c.value = '';
      });
    });

    btnCheck.addEventListener('click', () => {
      disableAllAndWhiteText();
      applyColorsOnCheck();
    });

    btnNew.addEventListener('click', () => {
      resetAll();
    });
  }

  function init() {
    attachListeners();
  }

  init();
})();
