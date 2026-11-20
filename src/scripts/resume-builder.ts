import { profile } from '../data/profile';

interface ResumeExperience {
  id: number;
  company: string;
  description: string;
  title: string;
  period: string;
  tasks: string;
}

interface ResumeEducation {
  id: number;
  degree: string;
  institution: string;
  board: string;
  session: string;
  result: string;
}

interface ResumeState {
  fullName: string;
  contact: string;
  summary: string;
  skills: string;
  professionalQual: string;
  experiences: ResumeExperience[];
  educations: ResumeEducation[];
  personal: {
    phone: string;
    father: string;
    mother: string;
    dob: string;
    religion: string;
    nationality: string;
    maritalStatus: string;
  };
}

const STORAGE_KEY = 'ats-resume-draft-v1';

function createDefaultState(): ResumeState {
  const company = profile.experience[0];

  return {
    fullName: profile.fullName,
    contact: [
      profile.contact.address,
      `${profile.contact.email} | ${profile.contact.website} | ${profile.contact.github}`,
    ].join('\n'),
    summary: profile.summary,
    skills: profile.skills
      .map((s) => (s.detail ? `• ${s.name} (${s.detail})` : `• ${s.name}`))
      .join('\n'),
    professionalQual: [
      profile.professionalQualification.title,
      profile.professionalQualification.institute,
      profile.professionalQualification.summary,
    ].join('\n'),
    experiences: company.roles.map((role, index) => ({
      id: index + 1,
      company: `${company.company} (${company.group})`,
      description: index === 0 ? company.about : '',
      title: role.title,
      period: role.period,
      tasks: role.responsibilities.map((item) => `• ${item}`).join('\n'),
    })),
    educations: profile.education.map((edu, index) => ({
      id: index + 1,
      degree: edu.degree,
      institution: edu.institution,
      board: edu.affiliationOrBoard,
      session: edu.session,
      result: `${edu.resultLabel}: ${edu.resultValue} / ${edu.resultScale}`,
    })),
    personal: {
      phone: '',
      father: '',
      mother: '',
      dob: '',
      religion: '',
      nationality: '',
      maritalStatus: '',
    },
  };
}

function loadState(): ResumeState {
  const fallback = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ResumeState>;
    if (
      typeof parsed.fullName !== 'string' ||
      !Array.isArray(parsed.experiences) ||
      !Array.isArray(parsed.educations)
    ) {
      return fallback;
    }
    return {
      ...fallback,
      ...parsed,
      personal: {
        ...fallback.personal,
        ...(parsed.personal ?? {}),
      },
    };
  } catch {
    return fallback;
  }
}

function saveState(state: ResumeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors (e.g. private browsing restrictions)
  }
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createField(
  id: string,
  labelText: string,
  value: string,
  onChange: (next: string) => void,
  multiline = false,
  rows = 3,
  placeholder = ''
): HTMLDivElement {
  const wrapper = el('div', 'rb-field');
  const label = el('label', 'rb-label', labelText);
  label.htmlFor = id;

  const input = multiline ? document.createElement('textarea') : document.createElement('input');
  input.id = id;
  input.className = 'rb-input';
  if (!multiline && input instanceof HTMLInputElement) {
    input.type = 'text';
  }
  if (multiline && input instanceof HTMLTextAreaElement) {
    input.rows = rows;
  }
  if (placeholder) input.placeholder = placeholder;
  input.value = value;
  input.addEventListener('input', () => onChange(input.value));

  wrapper.append(label, input);
  return wrapper;
}

export function initResumeBuilder(): void {
  const root = document.getElementById('resume-builder-root');
  if (!root) return;

  let state = loadState();
  let nextId =
    Math.max(
      10,
      ...state.experiences.map((e) => e.id),
      ...state.educations.map((e) => e.id)
    ) + 1;

  // Static input elements
  const inName = document.getElementById('in-name') as HTMLInputElement | null;
  const inContact = document.getElementById('in-contact') as HTMLTextAreaElement | null;
  const inSummary = document.getElementById('in-summary') as HTMLTextAreaElement | null;
  const inSkills = document.getElementById('in-skills') as HTMLTextAreaElement | null;
  const inProfQual = document.getElementById('in-prof-qual') as HTMLTextAreaElement | null;

  const personalInputs: Record<keyof ResumeState['personal'], HTMLInputElement | null> = {
    phone: document.getElementById('in-phone') as HTMLInputElement | null,
    father: document.getElementById('in-father') as HTMLInputElement | null,
    mother: document.getElementById('in-mother') as HTMLInputElement | null,
    dob: document.getElementById('in-dob') as HTMLInputElement | null,
    religion: document.getElementById('in-religion') as HTMLInputElement | null,
    nationality: document.getElementById('in-nationality') as HTMLInputElement | null,
    maritalStatus: document.getElementById('in-marital') as HTMLInputElement | null,
  };

  const expListEl = document.getElementById('experience-list');
  const eduListEl = document.getElementById('education-list');

  // Preview elements
  const pvName = document.getElementById('pv-name');
  const pvContact = document.getElementById('pv-contact');
  const pvSummary = document.getElementById('pv-summary');
  const pvSkills = document.getElementById('pv-skills');
  const pvProfQual = document.getElementById('pv-prof-qual');
  const pvExpContainer = document.getElementById('pv-experience-container');
  const pvEduContainer = document.getElementById('pv-education-container');
  const pvPersonalSection = document.getElementById('pv-personal-section');
  const pvPersonalList = document.getElementById('pv-personal-list');

  function syncStaticInputs(): void {
    if (inName) inName.value = state.fullName;
    if (inContact) inContact.value = state.contact;
    if (inSummary) inSummary.value = state.summary;
    if (inSkills) inSkills.value = state.skills;
    if (inProfQual) inProfQual.value = state.professionalQual;

    (Object.keys(personalInputs) as (keyof ResumeState['personal'])[]).forEach((key) => {
      const input = personalInputs[key];
      if (input) input.value = state.personal[key];
    });
  }

  function renderPreview(): void {
    if (pvName) pvName.textContent = state.fullName.trim() || 'Your Name';
    if (pvContact) {
      const phone = state.personal.phone.trim();
      pvContact.textContent = phone ? `${phone}\n${state.contact}` : state.contact;
    }
    if (pvSummary) pvSummary.textContent = state.summary;
    if (pvSkills) pvSkills.textContent = state.skills;
    if (pvProfQual) pvProfQual.textContent = state.professionalQual;

    // Render Experience safely with DOM APIs (zero innerHTML)
    if (pvExpContainer) {
      const nodes = state.experiences.map((exp) => {
        const job = el('div', 'pv-job');

        if (exp.company.trim()) {
          job.append(el('div', 'pv-job-company', exp.company));
        }
        if (exp.description.trim()) {
          job.append(el('p', 'pv-job-desc', exp.description));
        }

        const row = el('div', 'pv-job-row');
        row.append(
          el('div', 'pv-job-title', exp.title),
          el('div', 'pv-job-date', exp.period ? `[ ${exp.period} ]` : '')
        );
        job.append(row);

        if (exp.tasks.trim()) {
          job.append(el('div', 'pv-job-label', 'Key Responsibilities:'));
          job.append(el('div', 'pv-job-tasks', exp.tasks));
        }

        return job;
      });
      pvExpContainer.replaceChildren(...nodes);
    }

    // Render Education safely with DOM APIs
    if (pvEduContainer) {
      const nodes = state.educations.map((edu) => {
        const item = el('div', 'pv-edu-item');

        const header = el('div', 'pv-edu-header');
        header.append(
          el('span', 'pv-edu-degree', edu.degree),
          el('span', 'pv-edu-year', edu.session)
        );
        item.append(header);

        if (edu.institution.trim()) {
          item.append(el('div', 'pv-edu-inst', edu.institution));
        }

        const detailsParts: string[] = [];
        if (edu.board.trim()) detailsParts.push(edu.board.trim());
        if (edu.result.trim()) detailsParts.push(edu.result.trim());

        if (detailsParts.length > 0) {
          item.append(el('div', 'pv-edu-details', detailsParts.join('  |  ')));
        }

        return item;
      });
      pvEduContainer.replaceChildren(...nodes);
    }

    // Render Optional Personal Details only when at least one field is populated
    if (pvPersonalSection && pvPersonalList) {
      const rows: [string, string][] = [
        ["Father's Name", state.personal.father.trim()],
        ["Mother's Name", state.personal.mother.trim()],
        ['Date of Birth', state.personal.dob.trim()],
        ['Religion', state.personal.religion.trim()],
        ['Nationality', state.personal.nationality.trim()],
        ['Marital Status', state.personal.maritalStatus.trim()],
      ].filter(([, val]) => val.length > 0) as [string, string][];

      if (rows.length === 0) {
        pvPersonalSection.hidden = true;
        pvPersonalList.replaceChildren();
      } else {
        pvPersonalSection.hidden = false;
        const rowNodes = rows.map(([label, val]) => {
          const row = el('div', 'pv-detail-row');
          row.append(
            el('div', 'pv-detail-label', `${label}:`),
            el('div', 'pv-detail-value', val)
          );
          return row;
        });
        pvPersonalList.replaceChildren(...rowNodes);
      }
    }
  }

  function commit(): void {
    saveState(state);
    renderPreview();
  }

  function renderDynamicEditors(): void {
    // Experiences
    if (expListEl) {
      const cards = state.experiences.map((exp, index) => {
        const card = el('div', 'rb-item-card');

        const header = el('div', 'rb-item-header');
        header.append(el('span', 'rb-item-title', `Experience #${index + 1}`));

        if (state.experiences.length > 1) {
          const removeBtn = el('button', 'rb-btn-remove', 'Remove');
          removeBtn.type = 'button';
          removeBtn.addEventListener('click', () => {
            state.experiences = state.experiences.filter((item) => item.id !== exp.id);
            renderDynamicEditors();
            commit();
          });
          header.append(removeBtn);
        }

        card.append(header);
        card.append(
          createField(`exp-company-${exp.id}`, 'Company / Organization', exp.company, (val) => {
            exp.company = val;
            commit();
          }),
          createField(
            `exp-desc-${exp.id}`,
            'Company Summary (optional)',
            exp.description,
            (val) => {
              exp.description = val;
              commit();
            },
            false,
            2,
            'Brief organization context'
          )
        );

        const row = el('div', 'rb-grid-2');
        row.append(
          createField(`exp-title-${exp.id}`, 'Role Title', exp.title, (val) => {
            exp.title = val;
            commit();
          }),
          createField(`exp-period-${exp.id}`, 'Period', exp.period, (val) => {
            exp.period = val;
            commit();
          })
        );
        card.append(row);

        card.append(
          createField(
            `exp-tasks-${exp.id}`,
            'Responsibilities (one per line)',
            exp.tasks,
            (val) => {
              exp.tasks = val;
              commit();
            },
            true,
            4
          )
        );

        return card;
      });

      expListEl.replaceChildren(...cards);
    }

    // Educations
    if (eduListEl) {
      const cards = state.educations.map((edu, index) => {
        const card = el('div', 'rb-item-card');

        const header = el('div', 'rb-item-header');
        header.append(el('span', 'rb-item-title', `Education #${index + 1}`));

        if (state.educations.length > 1) {
          const removeBtn = el('button', 'rb-btn-remove', 'Remove');
          removeBtn.type = 'button';
          removeBtn.addEventListener('click', () => {
            state.educations = state.educations.filter((item) => item.id !== edu.id);
            renderDynamicEditors();
            commit();
          });
          header.append(removeBtn);
        }

        card.append(header);

        const row1 = el('div', 'rb-grid-2');
        row1.append(
          createField(`edu-degree-${edu.id}`, 'Degree', edu.degree, (val) => {
            edu.degree = val;
            commit();
          }),
          createField(`edu-session-${edu.id}`, 'Session / Year', edu.session, (val) => {
            edu.session = val;
            commit();
          })
        );

        const row2 = el('div', 'rb-grid-2');
        row2.append(
          createField(`edu-inst-${edu.id}`, 'Institution', edu.institution, (val) => {
            edu.institution = val;
            commit();
          }),
          createField(`edu-board-${edu.id}`, 'University / Board', edu.board, (val) => {
            edu.board = val;
            commit();
          })
        );

        card.append(
          row1,
          row2,
          createField(`edu-result-${edu.id}`, 'Result (CGPA / GPA)', edu.result, (val) => {
            edu.result = val;
            commit();
          })
        );

        return card;
      });

      eduListEl.replaceChildren(...cards);
    }
  }

  // Bind static inputs
  inName?.addEventListener('input', () => {
    state.fullName = inName.value;
    commit();
  });
  inContact?.addEventListener('input', () => {
    state.contact = inContact.value;
    commit();
  });
  inSummary?.addEventListener('input', () => {
    state.summary = inSummary.value;
    commit();
  });
  inSkills?.addEventListener('input', () => {
    state.skills = inSkills.value;
    commit();
  });
  inProfQual?.addEventListener('input', () => {
    state.professionalQual = inProfQual.value;
    commit();
  });

  (Object.keys(personalInputs) as (keyof ResumeState['personal'])[]).forEach((key) => {
    const input = personalInputs[key];
    input?.addEventListener('input', () => {
      state.personal[key] = input.value;
      commit();
    });
  });

  // Action buttons
  document.getElementById('btn-add-exp')?.addEventListener('click', () => {
    state.experiences.push({
      id: nextId++,
      company: '',
      description: '',
      title: '',
      period: '',
      tasks: '',
    });
    renderDynamicEditors();
    commit();
  });

  document.getElementById('btn-add-edu')?.addEventListener('click', () => {
    state.educations.push({
      id: nextId++,
      degree: '',
      institution: '',
      board: '',
      session: '',
      result: '',
    });
    renderDynamicEditors();
    commit();
  });

  document.getElementById('btn-reset-resume')?.addEventListener('click', () => {
    state = createDefaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    syncStaticInputs();
    renderDynamicEditors();
    renderPreview();
  });

  document.getElementById('btn-print-resume')?.addEventListener('click', () => {
    window.print();
  });

  // Initial render
  syncStaticInputs();
  renderDynamicEditors();
  renderPreview();
}

initResumeBuilder();
