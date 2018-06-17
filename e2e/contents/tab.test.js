import * as windows from "../ambassador/src/client/windows";
import * as tabs from "../ambassador/src/client/tabs";
import * as keys from "../ambassador/src/client/keys";
import { CLIENT_URL } from '../web-server/url';

describe("tab test", () => {
  let targetWindow;

  beforeEach(() => {
    return windows.create(CLIENT_URL).then((win) => {
      targetWindow = win;
    });
  });

  afterEach(() => {
    return windows.remove(targetWindow.id);
  });

  it('deletes tab by d', () => {
    let before;
    let targetTab;
    return tabs.create(targetWindow.id, CLIENT_URL).then((tab) => {
      targetTab = tab;
      return windows.get(targetWindow.id);
    }).then((win) => {
      before = win;
      return keys.press(targetTab.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((actual) => {
      expect(actual.tabs).to.have.lengthOf(before.tabs.length - 1);
    });
  });

  it('duplicates tab by zd', () => {
    let before;
    let targetTab;
    return tabs.create(targetWindow.id, CLIENT_URL).then((tab) => {
      targetTab = tab;
      return windows.get(targetWindow.id)
    }).then((win) => {;
      before = win;
      return keys.press(targetTab.id, 'z');
    }).then(() => {
      return keys.press(targetTab.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((actual) => {
      expect(actual.tabs).to.have.lengthOf(before.tabs.length + 1);
    });
  })

  it('makes pinned by zp', () => {
    let before;
    let targetTab;
    return tabs.create(targetWindow.id, CLIENT_URL).then((tab) => {
      targetTab = tab;
      return windows.get(targetWindow.id)
    }).then((win) => {;
      before = win;
      return keys.press(targetTab.id, 'z');
    }).then(() => {
      return keys.press(targetTab.id, 'p');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((actual) => {
      expect(actual.tabs[0].pinned).to.be.true;
    });
  })

  it('selects previous tab by K', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 2);
    }).then((tab) => {
      return keys.press(tab.id, 'K', { shiftKey: true });
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[1].active).to.be.true;
    });
  });

  it('selects previous tab by K rotatory', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 0);
    }).then((tab) => {
      return keys.press(tab.id, 'K', { shiftKey: true });
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[3].active).to.be.true;
    });
  });

  it('selects next tab by J', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 2);
    }).then((tab) => {
      return keys.press(tab.id, 'J', { shiftKey: true });
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[3].active).to.be.true;
    });
  });

  it('selects previous tab by J rotatory', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 3);
    }).then((tab) => {
      return keys.press(tab.id, 'J', { shiftKey: true });
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[0].active).to.be.true;
    });
  });

  it('selects first tab by g0', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 2);
    }).then((tab) => {
      return keys.press(tab.id, 'g').then(() => tab);
    }).then((tab) => {
      return keys.press(tab.id, '0');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[0].active).to.be.true;
    });
  });

  it('selects last tab by g$', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 2);
    }).then((tab) => {
      return keys.press(tab.id, 'g').then(() => tab);
    }).then((tab) => {
      return keys.press(tab.id, '$');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[3].active).to.be.true;
    });
  });

  it('selects last selected tab by <C-6>', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#2')
    }).then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#3');
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 1);
    }).then(() => {
      return tabs.selectAt(targetWindow.id, 3);
    }).then((tab) => {
      return keys.press(tab.id, '6', { ctrlKey: true });
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs[1].active).to.be.true;
    });
  });

  it('deletes tab by d', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1');
    }).then((tab) => {
      return keys.press(tab.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs).to.have.lengthOf(1);
    });
  });

  it('reopen tab by u', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1');
    }).then((tab) => {
      return keys.press(tab.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs).to.have.lengthOf(1);
      return keys.press(win.tabs[0].id, 'u');
    }).then(() => {
      return new Promise((resolve) => setTimeout(resolve, 100));
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs).to.have.lengthOf(2);
    });
  });

  it('does not delete pinned tab by d', () => {
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1');
    }).then((tab) => {
      return tabs.update(tab.id, { pinned: true });
    }).then((tab) => {
      return keys.press(tab.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs).to.have.lengthOf(2);
    });
  });

  it('deletes pinned tab by !d', () => {
    let target;
    return Promise.resolve().then(() => {
      return tabs.create(targetWindow.id, CLIENT_URL + '#1');
    }).then((tab) => {
      return tabs.update(tab.id, { pinned: true });
    }).then((tab) => {
      target = tab;
      return keys.press(target.id, '!');
    }).then(() => {
      return keys.press(target.id, 'd');
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs).to.have.lengthOf(1);
    });
  });

  it('opens view-source by gf', () => {
    let target;
    return Promise.resolve().then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      target = win.tabs[0];
      return keys.press(target.id, 'g');
    }).then(() => {
      return keys.press(target.id, 'f');
    }).then(() => {
      return new Promise((resolve) => setTimeout(resolve, 300));
    }).then(() => {
      return windows.get(targetWindow.id);
    }).then((win) => {
      expect(win.tabs.map((t) => t.url)).to.include.members([CLIENT_URL + '/', 'view-source:' + CLIENT_URL + '/']);
    });
  });
});
