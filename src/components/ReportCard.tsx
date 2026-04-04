// ============================================================
// src/components/ReportCard.tsx
// Cyber-RYT2 — Reusable Report Card Component
// Author: Rushil Varade
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Report, Severity } from '../data/reports';

export interface ReportCardProps {
  report: Report;
  featured?: boolean;
}

const severityBg: Record<Severity, string> = {
  CRITICAL: 'rgba(255,59,59,0.15)',
  HIGH:     'rgba(255,140,0,0.15)',
  MEDIUM:   'rgba(245,197,24,0.12)',
  LOW:      'rgba(0,194,168,0.12)',
  INFO:     'rgba(107,122,153,0.12)',
};
const severityBorder: Record<Severity, string> = {
  CRITICAL: '#ff3b3b',
  HIGH:     '#ff8c00',
  MEDIUM:   '#f5c518',
  LOW:      '#00c2a8',
  INFO:     '#6b7a99',
};

const difficultyColor: Record<string, string> = {
  'Easy':        '#00c2a8',
  'Easy-Medium': '#5de8c8',
  'Medium':      '#f5c518',
  'Medium-Hard': '#ff8c00',
  'Hard':        '#ff3b3b',
  'Insane':      '#d400ff',
};

const typeIcon: Record<string, string> = {
  'Pentest Report':      '📋',
  'CTF Walkthrough':     '🚩',
  'Security Assessment': '🔍',
  'Web Assessment':      '🌐',
  'Lab Report':          '🧪',
};

const platformIcon: Record<string, string> = {
  'VulnHub':      '🖥',
  'HackTheBox':   '📦',
  'TryHackMe':    '🛡',
  'Web Pentest':  '🌐',
  'Internal Lab': '🔒',
  'Client Report':'💼',
  'PentesterLab': '🔬',
};

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Published: { bg: 'rgba(0,194,168,0.12)',  color: '#00c2a8', border: '#00c2a8' },
  Draft:     { bg: 'rgba(245,197,24,0.1)',   color: '#f5c518', border: '#f5c518' },
  Archived:  { bg: 'rgba(107,122,153,0.1)', color: '#6b7a99', border: '#6b7a99' },
};

const ReportCard: React.FC<ReportCardProps> = ({ report, featured = false }) => {
  const navigate = useNavigate();

  const maxSeverity = report.vulnerabilitySummary
    ? report.vulnerabilitySummary.critical > 0 ? 'CRITICAL'
    : report.vulnerabilitySummary.high > 0     ? 'HIGH'
    : report.vulnerabilitySummary.medium > 0   ? 'MEDIUM'
    : 'LOW'
    : null;

  return (
    <div
      onClick={() => navigate(`/reports/${report.id}`)}
      style={{
        background: 'rgba(10,15,28,0.9)',
        border: '1px solid rgba(0,194,168,0.15)',
        borderRadius: '12px',
        padding: featured ? '28px' : '22px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,194,168,0.5)';
        (e.currentTarget as HTMLDivElement).style.transform   = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow   = '0 12px 40px rgba(0,194,168,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,194,168,0.15)';
        (e.currentTarget as HTMLDivElement).style.transform   = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow   = 'none';
      }}
    >
      {/* Glow accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: maxSeverity
          ? `linear-gradient(90deg, transparent, ${severityBorder[maxSeverity as Severity]}, transparent)`
          : 'linear-gradient(90deg, transparent, #00c2a8, transparent)',
      }} />

      {/* Top row: type + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px',
            color: '#00c2a8', textTransform: 'uppercase',
            background: 'rgba(0,194,168,0.1)',
            border: '1px solid rgba(0,194,168,0.25)',
            padding: '3px 10px', borderRadius: '4px',
          }}>
            {typeIcon[report.type] || '📄'} {report.type}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 600,
            color: '#a0aec0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '3px 10px', borderRadius: '4px',
          }}>
            {platformIcon[report.platform]} {report.platform}
          </span>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '1px',
          color:       statusStyle[report.status].color,
          background:  statusStyle[report.status].bg,
          border:      `1px solid ${statusStyle[report.status].border}`,
          padding: '3px 10px', borderRadius: '20px',
        }}>
          ● {report.status}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          margin: 0,
          fontSize: featured ? '20px' : '17px',
          fontWeight: 700,
          color: '#e8f4f8',
          fontFamily: "'Courier New', monospace",
          lineHeight: 1.3,
        }}>
          {report.title}
        </h3>
        {report.subtitle && (
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b7a99' }}>
            {report.subtitle}
          </p>
        )}
      </div>

      {/* Short description */}
      <p style={{
        margin: 0, fontSize: '13px', color: '#a0aec0', lineHeight: 1.6,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {report.shortDescription}
      </p>

      {/* Vulnerability summary */}
      {report.vulnerabilitySummary && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as Severity[]).map(sev => {
            const count = report.vulnerabilitySummary![sev.toLowerCase() as keyof typeof report.vulnerabilitySummary] as number;
            if (!count) return null;
            return (
              <span key={sev} style={{
                fontSize: '11px', fontWeight: 700,
                color:      severityBorder[sev],
                background: severityBg[sev],
                border:     `1px solid ${severityBorder[sev]}40`,
                padding: '2px 8px', borderRadius: '4px',
              }}>
                {count} {sev}
              </span>
            );
          })}
        </div>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {report.tags.slice(0, 6).map(tag => (
          <span key={tag} style={{
            fontSize: '11px', color: '#718096',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '2px 8px', borderRadius: '4px',
            fontFamily: "'Courier New', monospace",
          }}>
            #{tag}
          </span>
        ))}
        {report.tags.length > 6 && (
          <span style={{ fontSize: '11px', color: '#4a5568', padding: '2px 4px' }}>
            +{report.tags.length - 6} more
          </span>
        )}
      </div>

      {/* Metadata row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '8px',
        paddingTop: '10px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#718096' }}>🗓 {report.date}</span>
          <span style={{ fontSize: '12px', color: '#718096' }}>⏱ {report.readingTime}</span>
          <span style={{ fontSize: '12px', color: '#718096' }}>✍️ {report.author}</span>
        </div>
        <span style={{
          fontSize: '12px', fontWeight: 700,
          color:      difficultyColor[report.difficulty] || '#f5c518',
          background: `${difficultyColor[report.difficulty] || 'rgba(245,197,24,0.1)'}20`,
          border:     `1px solid ${difficultyColor[report.difficulty] || 'rgba(245,197,24,0.3)'}50`,
          padding: '3px 10px', borderRadius: '4px',
        }}>
          ◈ {report.difficulty}
        </span>
      </div>

      {/* CTA Button */}
      <button
        onClick={e => { e.stopPropagation(); navigate(`/reports/${report.id}`); }}
        style={{
          marginTop: '2px',
          background: 'linear-gradient(135deg, rgba(0,194,168,0.15), rgba(0,194,168,0.05))',
          border: '1px solid rgba(0,194,168,0.35)',
          borderRadius: '6px',
          color: '#00c2a8',
          fontSize: '13px', fontWeight: 700,
          letterSpacing: '1px',
          padding: '10px 0',
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.2s ease',
          textTransform: 'uppercase',
          fontFamily: "'Courier New', monospace",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background    = 'rgba(0,194,168,0.25)';
          (e.currentTarget as HTMLButtonElement).style.borderColor   = '#00c2a8';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background    = 'linear-gradient(135deg, rgba(0,194,168,0.15), rgba(0,194,168,0.05))';
          (e.currentTarget as HTMLButtonElement).style.borderColor   = 'rgba(0,194,168,0.35)';
        }}
      >
        Read Report →
      </button>
    </div>
  );
};

export default ReportCard;